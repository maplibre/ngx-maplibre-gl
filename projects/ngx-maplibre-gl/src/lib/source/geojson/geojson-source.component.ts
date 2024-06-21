import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  NgZone,
  inject,
  input,
  signal,
} from '@angular/core';
import type { GeoJSONSource, GeoJSONSourceSpecification } from 'maplibre-gl';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { MapService } from '../../map/map.service';

/**
 * `mgl-geojson-source` - a geojson source component
 * @see [geojson](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.GeoJSONSource/)
 *
 * @category Source Components
 *
 * @example
 * ```html
 * ...
 * <mgl-map ...>
 *   <mgl-geojson-source id="symbols-source">
 *     <mgl-feature
 *       *ngFor="let geometry of geometries"
 *       [geometry]="geometry"
 *     ></mgl-feature>
 *   </mgl-geojson-source>
 *   ...
 *   <mgl-geojson-source
 *     id="earthquakes"
 *     [data]="earthquakes"
 *     [cluster]="true"
 *     [clusterMaxZoom]="14"
 *     [clusterRadius]="50"
 *   ></mgl-geojson-source>
 * </mgl-map>
 *
 * ```
 */
@Component({
  selector: 'mgl-geojson-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
// GeoJSONSourceSpecification
export class GeoJSONSourceComponent implements OnInit, OnDestroy, OnChanges {
  /** Init injection */
  private readonly mapService = inject(MapService);
  private readonly ngZone = inject(NgZone);

  /** Init input */
  readonly id = input.required<string>();

  /** Dynamic input */
  readonly data = input<GeoJSONSourceSpecification['data']>({
    type: 'FeatureCollection',
    features: [],
  });
  readonly maxzoom = input<GeoJSONSourceSpecification['maxzoom']>();
  readonly attribution = input<GeoJSONSourceSpecification['attribution']>();
  readonly buffer = input<GeoJSONSourceSpecification['buffer']>();
  readonly tolerance = input<GeoJSONSourceSpecification['tolerance']>();
  readonly cluster = input<GeoJSONSourceSpecification['cluster']>();
  readonly clusterRadius = input<GeoJSONSourceSpecification['clusterRadius']>();
  readonly clusterMaxZoom =
    input<GeoJSONSourceSpecification['clusterMaxZoom']>();
  readonly clusterMinPoints =
    input<GeoJSONSourceSpecification['clusterMinPoints']>();
  readonly clusterProperties =
    input<GeoJSONSourceSpecification['clusterProperties']>();
  readonly lineMetrics = input<GeoJSONSourceSpecification['lineMetrics']>();
  readonly generateId = input<GeoJSONSourceSpecification['generateId']>();
  readonly promoteId = input<GeoJSONSourceSpecification['promoteId']>();
  readonly filter = input<GeoJSONSourceSpecification['filter']>();

  /** @hidden */
  readonly type: GeoJSONSourceSpecification['type'] = 'geojson';

  readonly updateFeatureData = new Subject();

  private sub = new Subscription();
  private readonly sourceAdded = signal(false);
  private readonly featureIdCounter = signal(0);

  ngOnInit() {
    const sub1 = this.mapService.mapLoaded$.subscribe(() => {
      this.init();
      const sub = fromEvent(this.mapService.mapInstance, 'styledata')
        .pipe(filter(() => !this.mapService.mapInstance.getSource(this.id())))
        .subscribe(() => {
          this.init();
        });
      this.sub.add(sub);
    });
    this.sub.add(sub1);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.sourceAdded()) {
      return;
    }
    if (
      (changes.maxzoom && !changes.maxzoom.isFirstChange()) ||
      (changes.attribution && !changes.attribution.isFirstChange()) ||
      (changes.buffer && !changes.buffer.isFirstChange()) ||
      (changes.tolerance && !changes.tolerance.isFirstChange()) ||
      (changes.cluster && !changes.cluster.isFirstChange()) ||
      (changes.clusterRadius && !changes.clusterRadius.isFirstChange()) ||
      (changes.clusterMaxZoom && !changes.clusterMaxZoom.isFirstChange()) ||
      (changes.clusterMinPoints && !changes.clusterMinPoints.isFirstChange()) ||
      (changes.clusterProperties &&
        !changes.clusterProperties.isFirstChange()) ||
      (changes.lineMetrics && !changes.lineMetrics.isFirstChange()) ||
      (changes.generateId && !changes.generateId.isFirstChange()) ||
      (changes.promoteId && !changes.promoteId.isFirstChange()) ||
      (changes.filter && !changes.filter.isFirstChange())
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    }
    if (changes.data && !changes.data.isFirstChange()) {
      const source = this.mapService.getSource<GeoJSONSource>(this.id());
      if (source === undefined) {
        return;
      }
      source.setData(changes.data.currentValue);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if (this.sourceAdded()) {
      this.mapService.removeSource(this.id());
      this.sourceAdded.set(false);
    }
  }

  /**
   * For clustered sources, fetches the zoom at which the given cluster expands.
   * @param clusterId The value of the cluster's cluster_id property.
   */
  async getClusterExpansionZoom(clusterId: number) {
    const source = this.mapService.getSource<GeoJSONSource>(this.id());
    return this.ngZone.run(async () => {
      return source.getClusterExpansionZoom(clusterId);
    });
  }

  /**
   * For clustered sources, fetches the children of the given cluster on the next zoom level (as an array of GeoJSON features).
   * @param clusterId The value of the cluster's cluster_id property.
   */
  async getClusterChildren(clusterId: number) {
    const source = this.mapService.getSource<GeoJSONSource>(this.id());
    return this.ngZone.run(async () => {
      return source.getClusterChildren(clusterId);
    });
  }

  /**
   * For clustered sources, fetches the original points that belong to the cluster (as an array of GeoJSON features).
   * @param clusterId The value of the cluster's cluster_id property.
   * @param limit The maximum number of features to return.
   * @param offset The number of features to skip (e.g. for pagination).
   */
  async getClusterLeaves(clusterId: number, limit: number, offset: number) {
    const source = this.mapService.getSource<GeoJSONSource>(this.id());
    return this.ngZone.run(async () => {
      return source.getClusterLeaves(clusterId, limit, offset);
    });
  }

  _addFeature(feature: GeoJSON.Feature<GeoJSON.GeometryObject>) {
    const collection = <GeoJSON.FeatureCollection<GeoJSON.GeometryObject>>(
      this.data()
    );
    collection.features.push(feature);
    this.updateFeatureData.next(undefined);
  }

  _removeFeature(feature: GeoJSON.Feature<GeoJSON.GeometryObject>) {
    const collection = <GeoJSON.FeatureCollection<GeoJSON.GeometryObject>>(
      this.data()
    );
    const index = collection.features.indexOf(feature);
    if (index > -1) {
      collection.features.splice(index, 1);
    }
    this.updateFeatureData.next(undefined);
  }

  _getNewFeatureId() {
    this.featureIdCounter.update((featureIdCounter) => ++featureIdCounter);
    return this.featureIdCounter();
  }

  private init() {
    const source: GeoJSONSourceSpecification = {
      type: 'geojson',
      data: this.data(),
      maxzoom: this.maxzoom(),
      attribution: this.attribution(),
      buffer: this.buffer(),
      tolerance: this.tolerance(),
      cluster: this.cluster(),
      clusterRadius: this.clusterRadius(),
      clusterMaxZoom: this.clusterMaxZoom(),
      clusterMinPoints: this.clusterMinPoints(),
      clusterProperties: this.clusterProperties(),
      lineMetrics: this.lineMetrics(),
      generateId: this.generateId(),
      promoteId: this.promoteId(),
      filter: this.filter(),
    };
    this.mapService.addSource(this.id(), source);
    const sub = this.updateFeatureData.pipe(debounceTime(0)).subscribe(() => {
      const source = this.mapService.getSource<GeoJSONSource>(this.id());
      if (source === undefined) {
        return;
      }
      source.setData(this.data()! as string | GeoJSON.GeoJSON);
    });
    this.sub.add(sub);
    this.sourceAdded.set(true);
  }
}
