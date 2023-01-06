import { Component } from '@angular/core';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      #map
      [style]="
        'https://api.maptiler.com/maps/hybrid/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[12.67]"
      [center]="[-111.39819145202637, 45.262744821527804]"
      [pitch]="60"
      [bearing]="-102"
    >
      <mgl-raster-dem-source
        id="terrainSource"
        url="https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL"
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
