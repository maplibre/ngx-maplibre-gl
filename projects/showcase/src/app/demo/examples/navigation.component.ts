import { Component } from '@angular/core';
import {
  MapComponent,
  ControlComponent,
  NavigationControlDirective,
} from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [mapStyle]="
        'https://tiles.openfreemap.org/styles/liberty'
      "
      [zoom]="[9]"
      [center]="[-74.5, 40]"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-control mglNavigation/>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent, ControlComponent, NavigationControlDirective],
})
export class NavigationComponent { }
