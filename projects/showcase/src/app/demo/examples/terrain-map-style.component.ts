import { Component } from '@angular/core';

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
            url:
              'https://api.maptiler.com/tiles/satellite-v2/tiles.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
          },
          terrain: {
            type: 'raster-dem',
            url:
              'https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
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
        ],
        terrain: {
          source: 'terrain',
          exaggeration: 2.0
        }
      }"
      [zoom]="[12.67]"
      [center]="[-111.39819145202637, 45.262744821527804]"
      [pitch]="60"
      [bearing]="-102"
    >
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
})
export class TerrainMapStyleComponent {}
