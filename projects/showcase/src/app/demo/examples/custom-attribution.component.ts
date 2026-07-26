import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  MapComponent,
  ControlComponent,
  AttributionControlDirective,
} from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [mapStyle]="
        'https://tiles.openfreemap.org/styles/liberty'
      "
      [center]="[-77.04, 38.907]"
      [zoom]="[11.15]"
      [attributionControl]="false"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-control
        mglAttribution
        position="bottom-right"
        [customAttribution]="[
          '<a href=&quot;https://github.com/Wykks/ngx-mapbox-gl&quot; target=&quot;_blank&quot;>Maps made awesome in Angular</a>',
          'Hello World'
        ]"
      />
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent, ControlComponent, AttributionControlDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomAttributionComponent { }
