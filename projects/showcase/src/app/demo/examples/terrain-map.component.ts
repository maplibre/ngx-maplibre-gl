import { ChangeDetectionStrategy, Component } from '@angular/core';
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
      [pitch]="52"
      [terrain]="terrainSpec"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-raster-dem-source
        id="terrainSource"
        url="https://demotiles.maplibre.org/terrain-tiles/tiles.json"
        tileSize="256"
      />
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent, RasterDemSourceComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerrainMapComponent {
  readonly mapLibreExampleSource: string =
    'https://api.maptiler.com/maps/hybrid/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL';

  readonly terrainSpec: TerrainSpecification = {
    source: 'terrainSource',
    exaggeration: 1,
  };
}
