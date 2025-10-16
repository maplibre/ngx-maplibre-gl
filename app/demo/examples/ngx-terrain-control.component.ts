import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  MapComponent,
  ControlComponent,
  NavigationControlDirective,
  TerrainControlDirective,
  RasterDemSourceComponent,
} from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/hybrid/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[12]"
      [center]="[11.39085, 47.27574]"
      [pitch]="52"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-raster-dem-source
        id="terrainSource"
        url="https://demotiles.maplibre.org/terrain-tiles/tiles.json"
        tileSize="256"
      />
      <mgl-control
        mglNavigation
        showCompass="true"
        showZoom="true"
        visualizePitch="true"
      />
      <mgl-control
        mglTerrain
        source="terrainSource"
        exaggeration="5"
        position="top-right"
      />
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  preserveWhitespaces: false,
  imports: [
    MapComponent,
    RasterDemSourceComponent,
    ControlComponent,
    NavigationControlDirective,
    TerrainControlDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxTerrainSourceComponent { }
