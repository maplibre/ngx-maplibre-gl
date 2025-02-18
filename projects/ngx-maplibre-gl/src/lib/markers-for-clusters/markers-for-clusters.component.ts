import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Directive,
  NgZone,
  TemplateRef,
  afterNextRender,
  contentChild,
  inject,
  input,
  signal,
} from '@angular/core';
import type {
  MapGeoJSONFeature,
  MapSourceDataEvent,
  QueryRenderedFeaturesOptions,
} from 'maplibre-gl';
import { fromEvent, merge } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import { MarkerComponent } from '../marker/marker.component';
import { NgTemplateOutlet } from '@angular/common';
import { LayerComponent } from '../layer/layer.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
      [source]="source()"
      type="circle"
      [paint]="{ 'circle-radius': 0 }"
    ></mgl-layer>
    @for (feature of clusterPoints(); track $index) { 
      @if (feature.properties.cluster) {
        <mgl-marker [feature]="feature">
          <ng-container
            *ngTemplateOutlet="clusterPointTpl(); context: { $implicit: feature }"
          ></ng-container>
        </mgl-marker>
      } @else {
        <mgl-marker [feature]="feature">
          <ng-container
            *ngTemplateOutlet="pointTpl(); context: { $implicit: feature }"
          ></ng-container>
        </mgl-marker>
      } 
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  imports: [LayerComponent, MarkerComponent, NgTemplateOutlet],
})
export class MarkersForClustersComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly mapService = inject(MapService);
  private readonly ngZone = inject(NgZone);

  /** Init input */
  readonly source = input.required<string>();

  /** @hidden */
  readonly pointTpl = contentChild<PointDirective, TemplateRef<PointDirective>>(
    PointDirective,
    {
      read: TemplateRef,
    }
  );
  /** @hidden */
  readonly clusterPointTpl = contentChild<
    ClusterPointDirective,
    TemplateRef<ClusterPointDirective>
  >(ClusterPointDirective, {
    read: TemplateRef,
  });

  /** @hidden */
  readonly clusterPoints = signal<MapGeoJSONFeature[]>([]);
  /** @hidden */
  readonly layerId = `mgl-markers-for-clusters-${uniqId++}`;

  constructor() {
    afterNextRender(() => {
      const clusterDataUpdate = () =>
        fromEvent<MapSourceDataEvent>(this.mapService.mapInstance, 'data').pipe(
          filter(
            (e) =>
              e.sourceId === this.source() &&
              e.sourceDataType !== 'metadata' &&
              this.mapService.mapInstance.isSourceLoaded(this.source())
          )
        );
      this.mapService.mapCreated$
        .pipe(
          switchMap(clusterDataUpdate),
          switchMap(() =>
            merge(
              fromEvent(this.mapService.mapInstance, 'move'),
              fromEvent(this.mapService.mapInstance, 'moveend')
            ).pipe(startWith(undefined))
          )
        )
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.ngZone.run(() => {
            this.updateCluster();
          });
        });
    });
  }

  private updateCluster() {
    const params = this.getClusterParams(this.pointTpl());
    this.clusterPoints.set(
      this.mapService.mapInstance.queryRenderedFeatures(params)
    );
  }

  getClusterParams(
    pointTpl: TemplateRef<PointDirective> | undefined
  ): QueryRenderedFeaturesOptions {
    if (!pointTpl) {
      return { layers: [this.layerId], filter: ['==', 'cluster', true] };
    }

    return { layers: [this.layerId] };
  }
}
