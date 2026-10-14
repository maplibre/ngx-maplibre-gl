import {
  Component,
  DestroyRef,
  Directive,
  NgZone,
  TemplateRef,
  afterNextRender,
  computed,
  contentChild,
  inject,
  input,
  signal,
} from '@angular/core';
import type {
  MapSourceDataEvent,
  QueryRenderedFeaturesOptions,
} from 'maplibre-gl';
import { fromEvent, merge } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import { MarkerComponent } from '../marker/marker.component';
import {
  injectMglMarkerConfig,
  MglMarkerConfig,
} from '../marker/marker.config';
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
})
export class PointDirective {}

/**
 * a template directive for clustered point for {@link MarkersForClustersComponent}
 *
 * @category Directives
 */
@Directive({
  selector: 'ng-template[mglClusterPoint]',
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
      @let options =
        feature.properties?.cluster ? clusterOptions() : pointOptions();
      <mgl-marker
        [feature]="feature"
        [className]="options.className"
        [offset]="options.offset"
        [anchor]="options.anchor"
        [color]="options.color"
        [scale]="options.scale"
        [draggable]="options.draggable"
        [clickTolerance]="options.clickTolerance"
        [rotation]="options.rotation"
        [rotationAlignment]="options.rotationAlignment"
        [pitchAlignment]="options.pitchAlignment"
        [opacity]="options.opacity"
        [opacityWhenCovered]="options.opacityWhenCovered"
        [subpixelPositioning]="options.subpixelPositioning"
        [contentStyle]="options.contentStyle"
      >
        @if (feature.properties?.cluster) {
          <ng-container
            *ngTemplateOutlet="
              clusterPointTpl();
              context: { $implicit: feature }
            "
          ></ng-container>
        } @else {
          <ng-container
            *ngTemplateOutlet="pointTpl(); context: { $implicit: feature }"
          ></ng-container>
        }
      </mgl-marker>
    }
  `,
  preserveWhitespaces: false,
  imports: [LayerComponent, MarkerComponent, NgTemplateOutlet],
})
export class MarkersForClustersComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly mapService = inject(MapService);
  private readonly ngZone = inject(NgZone);
  private readonly config = injectMglMarkerConfig();

  /** Init input */
  readonly source = input.required<string>();

  /** Init input */
  readonly markerOptions = input<MglMarkerConfig>({});
  readonly clusterMarkerOptions = input<MglMarkerConfig>({});

  /** @hidden */
  readonly pointTpl = contentChild<PointDirective, TemplateRef<PointDirective>>(
    PointDirective,
    {
      read: TemplateRef,
    },
  );
  /** @hidden */
  readonly clusterPointTpl = contentChild<
    ClusterPointDirective,
    TemplateRef<ClusterPointDirective>
  >(ClusterPointDirective, {
    read: TemplateRef,
  });

  /** @hidden */
  readonly pointOptions = computed<MglMarkerConfig>(() => ({
    ...this.config,
    ...this.markerOptions(),
  }));

  /** @hidden */
  readonly clusterOptions = computed<MglMarkerConfig>(() => ({
    ...this.config,
    ...this.markerOptions(),
    ...this.clusterMarkerOptions(),
  }));

  /** @hidden */
  readonly clusterPoints = signal<GeoJSON.Feature<GeoJSON.Point>[]>([]);
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
              this.mapService.mapInstance.isSourceLoaded(this.source()),
          ),
        );
      this.mapService.mapCreated$
        .pipe(
          switchMap(clusterDataUpdate),
          switchMap(() =>
            merge(
              fromEvent(this.mapService.mapInstance, 'move'),
              fromEvent(this.mapService.mapInstance, 'moveend'),
            ).pipe(startWith(undefined)),
          ),
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
      this.mapService.mapInstance.queryRenderedFeatures(
        params,
      ) as GeoJSON.Feature<GeoJSON.Point>[],
    );
  }

  getClusterParams(
    pointTpl: TemplateRef<PointDirective> | undefined,
  ): QueryRenderedFeaturesOptions {
    if (!pointTpl) {
      return { layers: [this.layerId], filter: ['==', 'cluster', true] };
    }

    return { layers: [this.layerId] };
  }
}
