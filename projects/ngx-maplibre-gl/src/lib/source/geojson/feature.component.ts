import {
  Component,
  forwardRef,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  input,
  model,
  inject,
} from '@angular/core';
import { GeoJSONSourceComponent } from './geojson-source.component';

/**
 * `mgl-feature` - a feature component
 * [ngx] inside {@link GeoJSONSourceComponent} only
 *
 * @category Source Components
 */
@Component({
  selector: 'mgl-feature',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureComponent implements OnInit, OnDestroy {
  /** Init injection */
  private readonly geoJSONSourceComponent = inject<GeoJSONSourceComponent>(
    forwardRef(() => GeoJSONSourceComponent)
  );
  /** Init input */
  readonly id = model<number>(); 
  /** Init input */
  readonly geometry = input.required<GeoJSON.GeometryObject>();
  
  /** Init input */
  readonly properties = input<GeoJSON.Feature<GeoJSON.GeometryObject>['properties']>();

  private feature: GeoJSON.Feature<GeoJSON.GeometryObject>;

  ngOnInit() {
    const id = this.id();
    if (!id) {
      this.id.set(this.geoJSONSourceComponent._getNewFeatureId());
    }
    const properties = this.properties();
    this.feature = {
      type: 'Feature',
      geometry: this.geometry(),
      properties: properties ?? {},
    };
    this.feature.id = this.id();
    this.geoJSONSourceComponent._addFeature(this.feature);
  }

  ngOnDestroy(): void {
    this.geoJSONSourceComponent._removeFeature(this.feature);
  }

  updateCoordinates(coordinates: number[]) {
    (<GeoJSON.Point>this.feature.geometry).coordinates = coordinates;
    this.geoJSONSourceComponent.updateFeatureData();
  }

    /**
     * Sets the `state` of a feature.
     * 
     * @param state A set of key-value pairs. The values should be valid JSON types.
     * 
     * @see [maplibre-gl-js' Docs](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#setfeaturestate)
     */
    setFeatureState(state: any) {
      this.geoJSONSourceComponent.setFeatureState({id: this.id()}, state);
    }
  
    /**
     * Removes the `state` of a feature, setting it back to the default behavior.
     * 
     * @param key The key in the feature state to reset.
     * 
     * @see [maplibre-gl-js' Docs](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#removeFeatureState)
     */
    removeFeatureState(key?: string) {
      this.geoJSONSourceComponent.removeFeatureState({id: this.id()}, key);
    }
  
    /**
     * Gets the `state` of a feature.
     * 
     * @returns The state of the feature: a set of key-value pairs that was assigned to the feature at runtime.
     * 
     * @see [maplibre-gl-js' Docs](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#getFeatureState)
     */
    getFeatureState(): any {
      return this.geoJSONSourceComponent.getFeatureState({id: this.id()});
    }
}
