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
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
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
