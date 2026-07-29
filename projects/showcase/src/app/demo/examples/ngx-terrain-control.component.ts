import { Component } from '@angular/core';
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
      [mapStyle]="
        'https://tiles.openfreemap.org/styles/liberty'
      "
      [zoom]="12"
      [center]="[11.39085, 47.27574]"
      [pitch]="52"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-raster-dem-source
        id="terrainSource"
        url="https://demotiles.maplibre.org/terrain-tiles/tiles.json"
        [tileSize]="256"
      />
      <mgl-control
        mglNavigation
        [showCompass]="true"
        [showZoom]="true"
        [visualizePitch]="true"
      />
      <mgl-control
        mglTerrain
        source="terrainSource"
        [exaggeration]="5"
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
})
export class NgxTerrainSourceComponent { }
