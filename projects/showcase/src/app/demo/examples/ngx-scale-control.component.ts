import { Component } from '@angular/core';
import { MapComponent, ControlComponent, ScaleControlDirective } from '@maplibre/ngx-maplibre-gl';
import { MapTestingHelperDirective } from '../../helper/map-testing-helper.directive';
import { MglMapResizeDirective } from '../mgl-map-resize.directive';

@Component({
    selector: 'showcase-demo',
    template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
    >
      <mgl-control mglScale unit="imperial" position="top-right"></mgl-control>
    </mgl-map>
  `,
    styleUrls: ['./examples.css'],
    standalone: true,
    imports: [
        MapComponent,
        MglMapResizeDirective,
        MapTestingHelperDirective,
        ControlComponent,
        ScaleControlDirective,
    ],
})
export class NgxScaleControlComponent {}
