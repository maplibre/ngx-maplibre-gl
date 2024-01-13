import {
  Component,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from "@angular/core";
import { GeoJSONSourceComponent } from "./geojson-source.component";

@Component({
    selector: "mgl-feature",
    template: "",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class FeatureComponent
  implements OnInit, OnDestroy, GeoJSON.Feature<GeoJSON.GeometryObject> {
  /* Init inputs */
  @Input() id?: number; // FIXME number only for now https://github.com/mapbox/mapbox-gl-js/issues/2716
  @Input() geometry: GeoJSON.GeometryObject;
  @Input() properties: any;
  type: "Feature" = "Feature";

  private feature: GeoJSON.Feature<GeoJSON.GeometryObject>;

  constructor(
    @Inject(forwardRef(() => GeoJSONSourceComponent))
    private geoJSONSourceComponent: GeoJSONSourceComponent
  ) {}

  ngOnInit() {
    if (!this.id) {
      this.id = this.geoJSONSourceComponent._getNewFeatureId();
    }
    this.feature = {
      type: this.type,
      geometry: this.geometry,
      properties: this.properties ? this.properties : {},
    };
    this.feature.id = this.id;
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
