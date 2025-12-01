import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  MapComponent,
  GlobeControlDirective,
  ControlComponent,
} from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [mapStyle]="'https://demotiles.maplibre.org/style.json'"
      [zoom]="[2]"
      [center]="[0, 0]"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
      [projection]="{type: 'globe'}"
    >
       <mgl-control mglGlobe position="top-right"/>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent, ControlComponent, GlobeControlDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobeComponent { }
