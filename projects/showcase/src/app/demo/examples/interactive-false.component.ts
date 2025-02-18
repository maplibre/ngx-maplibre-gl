import { Component } from '@angular/core';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[9]"
      [center]="[-74.5, 40]"
      [interactive]="false"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent],
})
export class InteractiveFalseComponent {}
