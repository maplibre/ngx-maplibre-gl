import { Component } from '@angular/core';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [mapStyle]="
        'https://tiles.openfreemap.org/styles/liberty'
      "
      [zoom]="3"
      [center]="[-77.38, 39]"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent],
})
export class CustomStyleIdComponent { }
