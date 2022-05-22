import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  Input,
  NgZone,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { GeoJSONFeature, MapSourceDataEvent } from 'maplibre-gl';
import { fromEvent, merge, Subscription } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { MapService } from '../map/map.service';

@Directive({ selector: 'ng-template[mglPoint]' })
export class PointDirective {}

@Directive({ selector: 'ng-template[mglClusterPoint]' })
export class ClusterPointDirective {}

let uniqId = 0;

@Component({
  selector: 'mgl-markers-for-clusters',
  template: `
    <mgl-layer
      [id]="layerId"
      [source]="source"
      type="circle"
      [paint]="{ 'circle-radius': 0 }"
    ></mgl-layer>
    <ng-container
      *ngFor="let feature of clusterPoints; trackBy: trackByClusterPoint"
    >
      <ng-container *ngIf="feature.properties.cluster">
        <mgl-marker [feature]="feature">
          <ng-container
            *ngTemplateOutlet="clusterPointTpl; context: { $implicit: feature }"
          ></ng-container>
        </mgl-marker>
      </ng-container>
      <ng-container *ngIf="!feature.properties.cluster">
        <mgl-marker [feature]="feature">
          <ng-container
            *ngTemplateOutlet="pointTpl; context: { $implicit: feature }"
          ></ng-container>
        </mgl-marker>
      </ng-container>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MarkersForClustersComponent
  implements OnDestroy, AfterContentInit {
  /* Init input */
  @Input() source: string;

  @ContentChild(PointDirective, { read: TemplateRef, static: false })
  pointTpl?: TemplateRef<any>;
  @ContentChild(ClusterPointDirective, { read: TemplateRef, static: false })
  clusterPointTpl: TemplateRef<any>;

  clusterPoints: GeoJSONFeature[]; // Incorrect typings
  layerId = `mgl-markers-for-clusters-${uniqId++}`;

  private sub = new Subscription();

  constructor(
    private mapService: MapService,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngAfterContentInit() {
    const clusterDataUpdate = () =>
      fromEvent<MapSourceDataEvent>(this.mapService.mapInstance, 'data').pipe(
        filter(
          (e) =>
            e.sourceId === this.source &&
            e.sourceDataType !== 'metadata' &&
            this.mapService.mapInstance.isSourceLoaded(this.source)
        )
      );
    const sub = this.mapService.mapCreated$
      .pipe(
        switchMap(clusterDataUpdate),
        switchMap(() =>
          merge(
            fromEvent(this.mapService.mapInstance, 'move'),
            fromEvent(this.mapService.mapInstance, 'moveend')
          ).pipe(startWith(undefined))
        )
      )
      .subscribe(() => {
        this.ngZone.run(() => {
          this.updateCluster();
        });
      });
    this.sub.add(sub);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  trackByClusterPoint(_index: number, clusterPoint: { id: number }) {
    return clusterPoint.id;
  }

  private updateCluster() {
    // Invalid queryRenderedFeatures typing
    const params: any = { layers: [this.layerId] };
    if (!this.pointTpl) {
      params.filter = ['==', 'cluster', true];
    }
    this.clusterPoints = this.mapService.mapInstance.queryRenderedFeatures(
      params
    );
    this.changeDetectorRef.markForCheck();
  }
}
