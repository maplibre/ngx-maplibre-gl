import { Component } from '@angular/core';
import {
  MapComponent,
  ImageComponent,
  LayerComponent,
} from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [preserveDrawingBuffer]="true"
    >
      <mgl-image
        id="cat"
        url="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png"
        (imageLoaded)="imageLoaded = true"
      >
      </mgl-image>
      @if (imageLoaded) {
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
  standalone: true,
  imports: [MapComponent, ImageComponent, LayerComponent],
})
export class AddImageComponent {
  imageLoaded = false;
}
