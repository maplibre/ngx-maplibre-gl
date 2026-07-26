import { Component } from '@angular/core';
import { MapComponent, MarkerComponent } from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [mapStyle]="
        'https://tiles.openfreemap.org/styles/liberty'
      "
      [zoom]="[5]"
      [center]="[144.946457, -37.840935]"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-marker [lngLat]="[144.946457, -38.440935]" [rotation]="180"/>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent, MarkerComponent],
})
export class NgxMarkerRotateComponent { }
