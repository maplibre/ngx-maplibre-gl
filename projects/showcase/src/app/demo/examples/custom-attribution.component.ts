import { Component } from '@angular/core';
import {
  MapComponent,
  ControlComponent,
  AttributionControlDirective,
} from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [center]="[-77.04, 38.907]"
      [zoom]="[11.15]"
      [attributionControl]="false"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-control
        mglAttribution
        position="bottom-right"
        [customAttribution]="[
          '<a href=&quot;https://github.com/Wykks/ngx-mapbox-gl&quot; target=&quot;_blank&quot;>Maps made awesome in Angular</a>',
          'Hello World'
        ]"
      ></mgl-control>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent, ControlComponent, AttributionControlDirective],
})
export class CustomAttributionComponent {}
