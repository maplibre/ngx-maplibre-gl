import { Component } from '@angular/core';
import { TerrainSpecification } from 'maplibre-gl';
import { RasterDemSourceComponent } from '../../../../../ngx-maplibre-gl/src/lib/source/raster-dem-source.component';
import { MapTestingHelperDirective } from '../../helper/map-testing-helper.directive';
import { MglMapResizeDirective } from '../mgl-map-resize.directive';
import { MapComponent } from '../../../../../ngx-maplibre-gl/src/lib/map/map.component';

@Component({
    selector: 'showcase-demo',
    template: `
    <mgl-map
      [style]="mapLibreExampleSource"
      [zoom]="[12]"
      [center]="[11.39085, 47.27574]"
      [pitch]="52"
      [terrain]="terrainSpec"
    >
      <mgl-raster-dem-source
        id="terrainSource"
        url="https://demotiles.maplibre.org/terrain-tiles/tiles.json"
        tileSize="256"
      ></mgl-raster-dem-source>
    </mgl-map>
  `,
    styleUrls: ['./examples.css'],
    standalone: true,
    imports: [
        MapComponent,
        MglMapResizeDirective,
        MapTestingHelperDirective,
        RasterDemSourceComponent,
    ],
})
export class TerrainMapComponent {
  mapLibreExampleSource: string =
    'https://api.maptiler.com/maps/hybrid/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL';

  terrainSpec: TerrainSpecification = {
    source: 'terrainSource',
    exaggeration: 1,
  };
}
