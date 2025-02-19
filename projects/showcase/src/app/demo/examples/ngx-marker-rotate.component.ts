import { Component } from '@angular/core';
import { MapComponent, MarkerComponent } from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[5]"
      [center]="[144.946457, -37.840935]"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-marker [lngLat]="[144.946457, -38.440935]" [rotation]="180"></mgl-marker>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent, MarkerComponent],
})
export class NgxMarkerRotateComponent {}
