import { Component } from '@angular/core';
import { PopupComponent as PopupComponent_1 } from '../../../../../ngx-maplibre-gl/src/lib/popup/popup.component';
import { MapTestingHelperDirective } from '../../helper/map-testing-helper.directive';
import { MglMapResizeDirective } from '../mgl-map-resize.directive';
import { MapComponent } from '../../../../../ngx-maplibre-gl/src/lib/map/map.component';

@Component({
    selector: 'showcase-demo',
    template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[3]"
      [center]="[-96, 37.8]"
    >
      <mgl-popup
        [lngLat]="[-96, 37.8]"
        [closeOnClick]="false"
        [className]="'custom-popup-class1 custom-popup-class2'"
      >
        <h1>Hello world !</h1>
      </mgl-popup>
    </mgl-map>
  `,
    styleUrls: ['./examples.css', './popup.component.css'],
    standalone: true,
    imports: [
        MapComponent,
        MglMapResizeDirective,
        MapTestingHelperDirective,
        PopupComponent_1,
    ],
})
export class PopupComponent {}
