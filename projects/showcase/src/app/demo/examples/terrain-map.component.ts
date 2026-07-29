import { Component } from '@angular/core';
import { TerrainSpecification } from 'maplibre-gl';
import {
  MapComponent,
  RasterDemSourceComponent,
} from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [mapStyle]="mapLibreExampleSource"
      [zoom]="[12]"
      [center]="[11.39085, 47.27574]"
      [pitch]="[52]"
      [terrain]="terrainSpec"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-raster-dem-source
        id="terrainSource"
        url="https://demotiles.maplibre.org/terrain-tiles/tiles.json"
        [tileSize]="256"
      />
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent, RasterDemSourceComponent],
})
export class TerrainMapComponent {
  readonly mapLibreExampleSource: string =
    'https://tiles.openfreemap.org/styles/liberty';

  readonly terrainSpec: TerrainSpecification = {
    source: 'terrainSource',
    exaggeration: 1,
  };
}
