import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [mapStyle]="
        'https://tiles.openfreemap.org/styles/liberty'
      "
      [zoom]="[9]"
      [center]="[-74.5, 40]"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    />
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayMapComponent { }
