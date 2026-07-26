import { Component } from '@angular/core';
import {
  MapComponent,
  ControlComponent,
  GeolocateControlDirective,
} from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [mapStyle]="'https://demotiles.maplibre.org/style.json'"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-control
        mglGeolocate
        [positionOptions]="{
          enableHighAccuracy: true
        }"
        [trackUserLocation]="true"
      />
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent, ControlComponent, GeolocateControlDirective],
})
export class LocateUserComponent { }
