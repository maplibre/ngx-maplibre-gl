import { Component } from '@angular/core';
import {
  MapComponent,
  ControlComponent,
  ScaleControlDirective,
} from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [mapStyle]="'https://demotiles.maplibre.org/style.json'"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-control mglScale unit="imperial" position="top-right"/>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent, ControlComponent, ScaleControlDirective],
})
export class NgxScaleControlComponent { }
