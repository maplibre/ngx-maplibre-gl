import { Component } from '@angular/core';
import { MapComponent, PopupComponent, MarkerComponent } from '@maplibre/ngx-maplibre-gl';
import { NgStyle } from '@angular/common';
import { MapTestingHelperDirective } from '../../helper/map-testing-helper.directive';
import { MglMapResizeDirective } from '../mgl-map-resize.directive';

@Component({
    selector: 'showcase-demo',
    template: `
    <mgl-map
      [style]="'https://demotiles.maplibre.org/style.json'"
      [zoom]="[15]"
      [center]="[-77.0353, 38.8895]"
    >
      <mgl-marker #myMarker [lngLat]="[-77.0353, 38.8895]">
        <div
          [ngStyle]="{
            'background-image':
              'url(https://maplibre.org/maplibre-gl-js/docs/assets/washington-monument.jpg)',
            'background-size': 'cover',
            width: '50px',
            height: '50px',
            'border-radius': '50%',
            cursor: 'pointer'
          }"
        ></div>
      </mgl-marker>
      <mgl-popup [marker]="myMarker">
        Construction on the Washington Monument began in 1848.
      </mgl-popup>
    </mgl-map>
  `,
    styleUrls: ['./examples.css'],
    standalone: true,
    imports: [
        MapComponent,
        MglMapResizeDirective,
        MapTestingHelperDirective,
        MarkerComponent,
        NgStyle,
        PopupComponent,
    ],
})
export class SetPopupComponent {}
