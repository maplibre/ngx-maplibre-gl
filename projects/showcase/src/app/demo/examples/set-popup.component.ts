import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  MapComponent,
  PopupComponent,
  MarkerComponent,
} from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [mapStyle]="'https://demotiles.maplibre.org/style.json'"
      [zoom]="[15]"
      [center]="[-77.0353, 38.8895]"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-marker #myMarker [lngLat]="[-77.0353, 38.8895]">
        <div
        [style.backgroundImage]="'url(https://maplibre.org/maplibre-gl-js/docs/assets/washington-monument.jpg)'"
        [style.backgroundSize]="'cover'"
        [style.width]="'50px'"
        [style.height]="'50px'"
        [style.borderRadius]="'50%'"
        [style.cursor]="'pointer'"
        ></div>
      </mgl-marker>
      <mgl-popup [marker]="myMarker">
        Construction on the Washington Monument began in 1848.
      </mgl-popup>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent, MarkerComponent, PopupComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetPopupComponent { }
