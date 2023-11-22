import { Component } from '@angular/core';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';
import { MapTestingHelperDirective } from '../../helper/map-testing-helper.directive';
import { MglMapResizeDirective } from '../mgl-map-resize.directive';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="{
        version: 8,
        sources: {
          satellite: {
            tileSize: 512,
            type: 'raster',
            url: 'https://api.maptiler.com/tiles/satellite-v2/tiles.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
          }
        },
        layers: [
          {
            id: 'satellite',
            layout: {
              visibility: 'visible'
            },
            minzoom: 0,
            paint: {
              'raster-opacity': 1
            },
            'raster-opacity': 1,
            source: 'satellite',
            type: 'raster'
          }
        ]
      }"
      [zoom]="[9]"
      [center]="[137.9150899566626, 36.25956997955441]"
    >
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  standalone: true,
  imports: [MapComponent, MglMapResizeDirective, MapTestingHelperDirective],
})
export class SatelliteMapComponent {}
