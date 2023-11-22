import { Component } from '@angular/core';
import { NavigationControlDirective } from '../../../../../ngx-maplibre-gl/src/lib/control/navigation-control.directive';
import { ControlComponent } from '../../../../../ngx-maplibre-gl/src/lib/control/control.component';
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
      [zoom]="[9]"
      [center]="[-74.5, 40]"
    >
      <mgl-control mglNavigation></mgl-control>
    </mgl-map>
  `,
    styleUrls: ['./examples.css'],
    standalone: true,
    imports: [
        MapComponent,
        MglMapResizeDirective,
        MapTestingHelperDirective,
        ControlComponent,
        NavigationControlDirective,
    ],
})
export class NavigationComponent {}
