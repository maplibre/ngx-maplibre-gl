import { Component, signal } from '@angular/core';
import {
  MapComponent,
  ImageComponent,
  LayerComponent,
} from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [mapStyle]="'https://demotiles.maplibre.org/style.json'"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-image
        id="cat"
        url="https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png"
        (imageLoaded)="imageLoadedHandler()"
      />
      @if (imageLoaded()) {
        <mgl-layer
          id="points"
          type="symbol"
          [source]="{
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: [0, 0],
                  },
                },
              ],
            },
          }"
          [layout]="{ 'icon-image': 'cat', 'icon-size': 0.25 }"
        >
        </mgl-layer>
      }
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent, ImageComponent, LayerComponent],
})
export class AddImageComponent {
  readonly imageLoaded = signal(false);

  imageLoadedHandler(): void {
    this.imageLoaded.set(true);
  }
}
