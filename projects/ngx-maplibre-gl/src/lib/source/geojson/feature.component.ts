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
  standalone: true,
})
export class FeatureComponent implements OnInit, OnDestroy {
  /** Init injection */
  private readonly geoJSONSourceComponent = inject<GeoJSONSourceComponent>(
    forwardRef(() => GeoJSONSourceComponent)
  );
  /** Init input */
  readonly id = model<number>(); // FIXME number only for now https://github.com/mapbox/mapbox-gl-js/issues/2716
  readonly geometry = input.required<GeoJSON.GeometryObject>();
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

  ngOnDestroy() {
    this.geoJSONSourceComponent._removeFeature(this.feature);
  }

  updateCoordinates(coordinates: number[]) {
    (<GeoJSON.Point>this.feature.geometry).coordinates = coordinates;
    this.geoJSONSourceComponent.updateFeatureData.next(undefined);
  }
}
