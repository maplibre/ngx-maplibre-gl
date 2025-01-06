import { Component } from '@angular/core';
import {
  MapComponent,
  GlobeControlDirective,
  ControlComponent,
} from '@maplibre/ngx-maplibre-gl';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'https://demotiles.maplibre.org/style.json'"
      [zoom]="[2]"
      [center]="[0, 0]"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
      [projection]="{type: 'globe'}"
    >
       <mgl-control mglGlobe position="top-right"></mgl-control>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  standalone: true,
  imports: [MapComponent, NgStyle, ControlComponent, GlobeControlDirective],
})
export class GlobeComponent {}
