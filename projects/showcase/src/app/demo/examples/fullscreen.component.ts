import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  MapComponent,
  ControlComponent,
  FullscreenControlDirective,
} from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [mapStyle]="
        'https://tiles.openfreemap.org/styles/liberty'
      "
      [zoom]="[13]"
      [center]="[11.255, 43.77]"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-control mglFullscreen/>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent, ControlComponent, FullscreenControlDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenComponent { }
