import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[3]"
      [center]="[-77.38, 39]"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomStyleIdComponent { }
