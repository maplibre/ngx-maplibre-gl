import { Component } from '@angular/core';
import { MglMapResizeDirective } from '../mgl-map-resize.directive';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="{
        version: 8,
        sources: {
          satelliteSource: {
            tileSize: 512,
            type: 'raster',
            url: 'https://api.maptiler.com/tiles/satellite-v2/tiles.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
          },
          terrainSource: {
            type: 'raster-dem',
            url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
            tileSize: 256
          }
        },
        layers: [
          {
            id: 'satellite',
            type: 'raster',
            source: 'satelliteSource'
          }
        ],
        terrain: {
          source: 'terrainSource',
          exaggeration: 1
        }
      }"
      [zoom]="[12]"
      [center]="[11.39085, 47.27574]"
      [pitch]="52"
    >
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  standalone: true,
  imports: [MapComponent, MglMapResizeDirective],
})
export class TerrainMapStyleComponent {}
