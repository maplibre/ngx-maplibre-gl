import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  MapComponent,
  PopupComponent as MglPopupComponent,
} from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [mapStyle]="
        'https://tiles.openfreemap.org/styles/liberty'
      "
      [zoom]="[3]"
      [center]="[-96, 37.8]"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
      data-cy="mgl-map"
    >
      <mgl-popup
        [lngLat]="[-96, 37.8]"
        [closeOnClick]="false"
        [className]="'custom-popup-class1 custom-popup-class2'"
      >
        <div data-cy="popup-content">
          <h1>Hello world !</h1>
        </div>
      </mgl-popup>
    </mgl-map>
  `,
  styleUrls: ['./examples.css', './popup.component.css'],
  imports: [MapComponent, MglPopupComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent { }
