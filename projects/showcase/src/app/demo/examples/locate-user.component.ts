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
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-control
        mglGeolocate
        [positionOptions]="{
          enableHighAccuracy: true
        }"
        [trackUserLocation]="true"
      ></mgl-control>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent, ControlComponent, GeolocateControlDirective],
})
export class LocateUserComponent {}
