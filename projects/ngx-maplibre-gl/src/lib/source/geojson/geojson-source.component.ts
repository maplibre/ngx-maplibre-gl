import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  SimpleChanges,
  NgZone,
  inject,
  input,
  signal,
} from "@angular/core";
import type { GeoJSONSource, GeoJSONSourceSpecification } from "maplibre-gl";
import { Subject } from "rxjs";
import { debounceTime, switchMap, tap } from "rxjs/operators";
import { SourceDirective } from "../source.directive";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

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
  selector: "mgl-geojson-source",
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: SourceDirective, inputs: ["id"] }],
  standalone: true,
})
export class GeoJSONSourceComponent implements OnChanges {
  /** Init injections */
  private readonly sourceDirective = inject(SourceDirective);

  /** Init injection */
  private readonly ngZone = inject(NgZone);

  /** Dynamic input */
  readonly data = input<GeoJSONSourceSpecification["data"]>({
    type: "FeatureCollection",
    features: [],
  });

  /** Dynamic input */
  readonly maxzoom = input<GeoJSONSourceSpecification["maxzoom"]>();

  /** Dynamic input */
  readonly attribution = input<GeoJSONSourceSpecification["attribution"]>();

  /** Dynamic input */
  readonly buffer = input<GeoJSONSourceSpecification["buffer"]>();

  /** Dynamic input */
  readonly tolerance = input<GeoJSONSourceSpecification["tolerance"]>();

  /** Dynamic input */
  readonly cluster = input<GeoJSONSourceSpecification["cluster"]>();

  /** Dynamic input */
  readonly clusterRadius = input<GeoJSONSourceSpecification["clusterRadius"]>();

  /** Dynamic input */
  readonly clusterMaxZoom =
    input<GeoJSONSourceSpecification["clusterMaxZoom"]>();

  /** Dynamic input */
  readonly clusterMinPoints =
    input<GeoJSONSourceSpecification["clusterMinPoints"]>();

  /** Dynamic input */
  readonly clusterProperties =
    input<GeoJSONSourceSpecification["clusterProperties"]>();

  /** Dynamic input */
  readonly lineMetrics = input<GeoJSONSourceSpecification["lineMetrics"]>();

  /** Dynamic input */
  readonly generateId = input<GeoJSONSourceSpecification["generateId"]>();

  /** Dynamic input */
  readonly promoteId = input<GeoJSONSourceSpecification["promoteId"]>();

  /** Dynamic input */
  readonly filter = input<GeoJSONSourceSpecification["filter"]>();

  private readonly updateFeatureDataSubject = new Subject<void>();

  private readonly featureIdCounter = signal(0);

  constructor() {
    this.sourceDirective.loadSource$
      .pipe(
        tap(() =>
          this.sourceDirective.addSource(this.getGeoJSONSourceSpecification())
        ),
        switchMap(() => this.updateFeature()),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.sourceDirective.sourceId()) {
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
      this.sourceDirective.refresh();
    }
    if (changes.data && !changes.data.isFirstChange()) {
      const source = this.sourceDirective.getSource<GeoJSONSource>();
      if (source === undefined) {
        return;
      }
      source.setData(changes.data.currentValue);
    }
  }

  /**
   * For clustered sources, fetches the zoom at which the given cluster expands.
   * @param clusterId The value of the cluster's cluster_id property.
   */
  async getClusterExpansionZoom(clusterId: number) {
    const source = this.sourceDirective.getSource<GeoJSONSource>()!;
    return this.ngZone.run(async () => {
      return source.getClusterExpansionZoom(clusterId);
    });
  }

  /**
   * For clustered sources, fetches the children of the given cluster on the next zoom level (as an array of GeoJSON features).
   * @param clusterId The value of the cluster's cluster_id property.
   */
  async getClusterChildren(clusterId: number) {
    const source = this.sourceDirective.getSource<GeoJSONSource>()!;
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
    const source = this.sourceDirective.getSource<GeoJSONSource>()!;
    return this.ngZone.run(async () => {
      return source.getClusterLeaves(clusterId, limit, offset);
    });
  }

  _addFeature(feature: GeoJSON.Feature<GeoJSON.GeometryObject>) {
    const collection = <GeoJSON.FeatureCollection<GeoJSON.GeometryObject>>(
      this.data()
    );
    collection.features.push(feature);
    this.updateFeatureDataSubject.next();
  }

  _removeFeature(feature: GeoJSON.Feature<GeoJSON.GeometryObject>) {
    const collection = <GeoJSON.FeatureCollection<GeoJSON.GeometryObject>>(
      this.data()
    );
    const index = collection.features.indexOf(feature);
    if (index > -1) {
      collection.features.splice(index, 1);
    }
    this.updateFeatureDataSubject.next();
  }

  updateFeatureData() {
    this.updateFeatureDataSubject.next();
  }

  _getNewFeatureId() {
    this.featureIdCounter.update((featureIdCounter) => ++featureIdCounter);
    return this.featureIdCounter();
  }

  private getGeoJSONSourceSpecification(): GeoJSONSourceSpecification {
    return {
      type: "geojson",
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
  }

  private updateFeature() {
    return this.updateFeatureDataSubject.pipe(debounceTime(0)).pipe(
      tap(() => {
        const source = this.sourceDirective.getSource<GeoJSONSource>();
        if (source === undefined) {
          return;
        }
        source.setData(this.data()! as string | GeoJSON.GeoJSON);
      })
    );
  }
}
