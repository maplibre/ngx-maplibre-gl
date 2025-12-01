import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MapComponent, MarkerComponent } from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [mapStyle]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[5]"
      [center]="[-65.017, -16.457]"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      @for (feature of geojson.features; track feature) {
        <mgl-marker [feature]="feature">
          <div
            (click)="alert(feature.properties.message)"
            class="marker"
            [style.backgroundImage]="'url(/assets/ngx-maplibre-gl-red.svg)'"
            [style.width]="feature.properties.iconSize[0] + 'px'"
            [style.height]="feature.properties.iconSize[1] + 'px'"
          ></div>
        </mgl-marker>
      }
    </mgl-map>
  `,
  styleUrls: ['./examples.css', './custom-marker-icons.component.css'],
  imports: [MapComponent, MarkerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomMarkerIconsComponent {
  readonly geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          message: 'Foo',
          iconSize: [60, 60],
        },
        geometry: {
          type: 'Point',
          coordinates: [-66.324462890625, -16.024695711685304],
        },
      },
      {
        type: 'Feature',
        properties: {
          message: 'Bar',
          iconSize: [50, 50],
        },
        geometry: {
          type: 'Point',
          coordinates: [-61.2158203125, -15.97189158092897],
        },
      },
      {
        type: 'Feature',
        properties: {
          message: 'Baz',
          iconSize: [40, 40],
        },
        geometry: {
          type: 'Point',
          coordinates: [-63.29223632812499, -18.28151823530889],
        },
      },
    ],
  };

  alert(message: string) {
    alert(message);
  }
}
