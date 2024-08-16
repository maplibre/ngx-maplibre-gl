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
import { MapGeoJSONFeature, MapSourceDataEvent } from 'maplibre-gl';
import { fromEvent, merge, Subscription } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import { MarkerComponent } from '../marker/marker.component';
import { NgTemplateOutlet } from '@angular/common';
import { LayerComponent } from '../layer/layer.component';

/**
 * a template directive for point for {@link MarkersForClustersComponent}
 * 
 * @category Directives
 */
@Directive({
  selector: 'ng-template[mglPoint]',
  standalone: true,
})
export class PointDirective {}

/**
 * a template directive for clustered point for {@link MarkersForClustersComponent}
 * 
 * @category Directives
 */
@Directive({
  selector: 'ng-template[mglClusterPoint]',
  standalone: true,
})
export class ClusterPointDirective {}

let uniqId = 0;

/**
 * [ngx] `mgl-markers-for-clusters` - an HTML marker component for clustered points.
 * Requires a geojson source that is clustered.
 * 
 * @category Components
 * 
 * @example
 * ```html
 * ...
 * <mgl-map ...>
 *   <mgl-markers-for-cluster [source]="myGeoJsonclusteredSource">
 *     <ng-template mglPoint let-feature> Marker! </ng-template>
 *     <ng-template mglClusterPoint let-feature>
 *       ClusterId: {{feature.properties?.cluster_id}}, Points:
 *       {{feature.properties?.point_count}}
 *     </ng-template>
 *   </mgl-markers-for-cluster>
 * </mgl-map>
 * ```
 * 
 * Note: Only use this if you **really** need to use HTML/Angular component to render your symbols. This is **slower** than rendering symbols in WebGL.
 */ 
 @Component({
  selector: 'mgl-markers-for-clusters',
  template: `
    <mgl-layer
      [id]="layerId"
      [source]="source"
      type="circle"
      [paint]="{ 'circle-radius': 0 }"
    ></mgl-layer>
    @for (feature of clusterPoints; track feature.id) {
      @if (feature.properties.cluster) {
        <mgl-marker [feature]="feature">
          <ng-container
            *ngTemplateOutlet="clusterPointTpl; context: { $implicit: feature }"
          ></ng-container>
        </mgl-marker>
      } @else {
        <mgl-marker [feature]="feature">
          <ng-container
            *ngTemplateOutlet="pointTpl; context: { $implicit: feature }"
          ></ng-container>
        </mgl-marker>
      }
    }
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  standalone: true,
  imports: [LayerComponent, MarkerComponent, NgTemplateOutlet],
})
export class MarkersForClustersComponent
  implements OnDestroy, AfterContentInit {
  /** Init input */
  @Input() source: string;

  /** @hidden */
  @ContentChild(PointDirective, { read: TemplateRef, static: false })
  pointTpl?: TemplateRef<any>;
  /** @hidden */
  @ContentChild(ClusterPointDirective, { read: TemplateRef, static: false })
  clusterPointTpl: TemplateRef<any>;

  /** @hidden */
  clusterPoints: MapGeoJSONFeature[];
  /** @hidden */
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

  private updateCluster() {
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
