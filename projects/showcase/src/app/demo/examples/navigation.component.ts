import { Component } from '@angular/core';
import {
  MapComponent,
  ControlComponent,
  NavigationControlDirective,
} from '@maplibre/ngx-maplibre-gl';
import { MglMapResizeDirective } from '../mgl-map-resize.directive';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[9]"
      [center]="[-74.5, 40]"
    >
      <mgl-control mglNavigation></mgl-control>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  standalone: true,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    ControlComponent,
    NavigationControlDirective,
  ],
})
export class NavigationComponent {}
