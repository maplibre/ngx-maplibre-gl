import { Component } from '@angular/core';
import { TerrainControlDirective } from '../../../../../ngx-maplibre-gl/src/lib/control/terrain-control.directive';
import { NavigationControlDirective } from '../../../../../ngx-maplibre-gl/src/lib/control/navigation-control.directive';
import { ControlComponent } from '../../../../../ngx-maplibre-gl/src/lib/control/control.component';
import { RasterDemSourceComponent } from '../../../../../ngx-maplibre-gl/src/lib/source/raster-dem-source.component';
import { MapTestingHelperDirective } from '../../helper/map-testing-helper.directive';
import { MglMapResizeDirective } from '../mgl-map-resize.directive';
import { MapComponent } from '../../../../../ngx-maplibre-gl/src/lib/map/map.component';

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
    >
      <mgl-raster-dem-source
        id="terrainSource"
        url="https://demotiles.maplibre.org/terrain-tiles/tiles.json"
        tileSize="256"
      ></mgl-raster-dem-source>
      <mgl-control
        mglNavigation
        showCompass="true"
        showZoom="true"
        visualizePitch="true"
      ></mgl-control>
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
    standalone: true,
    imports: [
        MapComponent,
        MglMapResizeDirective,
        MapTestingHelperDirective,
        RasterDemSourceComponent,
        ControlComponent,
        NavigationControlDirective,
        TerrainControlDirective,
    ],
})
export class NgxTerrainSourceComponent {}
