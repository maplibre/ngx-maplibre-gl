import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  ControlComponent,
  LayerComponent,
  MapComponent,
} from '@maplibre/ngx-maplibre-gl';
import { LngLatBounds } from 'maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [mapStyle]="'https://demotiles.maplibre.org/style.json'"
      [zoom]="[12]"
      [center]="[-77.0214, 38.897]"
      [fitBounds]="bounds()"
      [fitBoundsOptions]="{
        padding: 20
      }"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-control>
        <button
          mat-raised-button
          class="zoom-button"
          (click)="zoomToBounds()"
          data-cy="zoom-button"
        >
          Zoom to bounds
        </button>
      </mgl-control>
      <mgl-layer
        id="LineString"
        type="line"
        [source]="source"
        [paint]="{
          'line-color': '#BF93E4',
          'line-width': 5
        }"
        [layout]="{
          'line-join': 'round',
          'line-cap': 'round'
        }"
      />
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  preserveWhitespaces: false,
  imports: [MapComponent, ControlComponent, MatButtonModule, LayerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZoomtoLinestringComponent {
  readonly bounds = signal<LngLatBounds | null>(null);

  readonly source = {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            properties: {},
            coordinates: <[number, number][]>[
              [-77.0366048812866, 38.89873175227713],
              [-77.03364372253417, 38.89876515143842],
              [-77.03364372253417, 38.89549195896866],
              [-77.02982425689697, 38.89549195896866],
              [-77.02400922775269, 38.89387200688839],
              [-77.01519012451172, 38.891416957534204],
              [-77.01521158218382, 38.892068305429156],
              [-77.00813055038452, 38.892051604275686],
              [-77.00832366943358, 38.89143365883688],
              [-77.00818419456482, 38.89082405874451],
              [-77.00815200805664, 38.88989712255097],
            ],
          },
        },
      ],
    },
  };

  zoomToBounds() {
    const coordinates = this.source.data.features[0].geometry.coordinates;

    const bounds = coordinates.reduce(
      (bounds, coord) => {
        return bounds.extend(coord);
      },
      new LngLatBounds(coordinates[0], coordinates[0]),
    );

    this.bounds.set(bounds);
  }
}
