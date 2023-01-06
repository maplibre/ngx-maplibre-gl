import { Component } from '@angular/core';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      #map
      [style]="
        'https://api.maptiler.com/maps/hybrid/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[12]"
      [center]="[11.39085, 47.27574]"
      [pitch]="52"
    >
      <mgl-raster-dem-source
        id="terrainSource"
        url="https://demotiles.maplibre.org/terrain-tiles/tiles.json"
        tileSize="256"
      ></mgl-raster-dem-source>
      <mgl-control
        mglTerrain
        source="terrainSource"
        exaggeration="5"
        position="top-right"
      ></mgl-control>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  preserveWhitespaces: false,
})
export class NgxTerrainSourceComponent {}
