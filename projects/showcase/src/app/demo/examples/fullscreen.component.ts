import { Component } from '@angular/core';
import {
  MapComponent,
  ControlComponent,
  FullscreenControlDirective,
} from '@maplibre/ngx-maplibre-gl';
import { MapTestingHelperDirective } from '../../helper/map-testing-helper.directive';
import { MglMapResizeDirective } from '../mgl-map-resize.directive';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[13]"
      [center]="[11.255, 43.77]"
    >
      <mgl-control mglFullscreen></mgl-control>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  standalone: true,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    MapTestingHelperDirective,
    ControlComponent,
    FullscreenControlDirective,
  ],
})
export class FullscreenComponent {}
