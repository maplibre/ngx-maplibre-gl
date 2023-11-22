import { Component } from '@angular/core';
import { MapComponent, ImageComponent, LayerComponent } from '@maplibre/ngx-maplibre-gl';
import { NgIf } from '@angular/common';
import { MapTestingHelperDirective } from '../../helper/map-testing-helper.directive';
import { MglMapResizeDirective } from '../mgl-map-resize.directive';

@Component({
    selector: 'showcase-demo',
    template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
    >
      <mgl-image
        id="cat"
        url="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png"
        (imageLoaded)="imageLoaded = true"
      >
      </mgl-image>
      <mgl-layer
        *ngIf="imageLoaded"
        id="points"
        type="symbol"
        [source]="{
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [0, 0]
                }
              }
            ]
          }
        }"
        [layout]="{ 'icon-image': 'cat', 'icon-size': 0.25 }"
      >
      </mgl-layer>
    </mgl-map>
  `,
    styleUrls: ['./examples.css'],
    standalone: true,
    imports: [
        MapComponent,
        MglMapResizeDirective,
        MapTestingHelperDirective,
        ImageComponent,
        NgIf,
        LayerComponent,
    ],
})
export class AddImageComponent {
  imageLoaded = false;
}
