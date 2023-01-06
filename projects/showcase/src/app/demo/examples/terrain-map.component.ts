import { Component } from '@angular/core';
import { TerrainSpecification } from 'maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="maptilerWinterStyle"
      [zoom]="[14.21]"
      [center]="[-111.40334129333496, 45.28219431643538]"
      [pitch]="60"
      [bearing]="-147"
      [terrain]="terrainSpec"
    >
      <mgl-raster-dem-source
        id="terrainSource"
        encoding="terrarium"
        type="raster-dem"
        [tiles]="[
          'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',
        ]"
        tileSize="256"
        attribution="https://registry.opendata.aws/terrain-tiles/"
      ></mgl-raster-dem-source>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
})
export class TerrainMapComponent {
  maptilerWinterStyle: string =
    'https://api.maptiler.com/maps/winter-v2/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL';

  terrainSpec: TerrainSpecification = {
    source: 'terrainSource',
    exaggeration: 2,
  };
}
