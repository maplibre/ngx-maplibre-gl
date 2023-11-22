import { Component } from '@angular/core';
import { Position } from '@maplibre/ngx-maplibre-gl';
import { ScaleControlDirective } from '../../../../../ngx-maplibre-gl/src/lib/control/scale-control.directive';
import { NavigationControlDirective } from '../../../../../ngx-maplibre-gl/src/lib/control/navigation-control.directive';
import { GeolocateControlDirective } from '../../../../../ngx-maplibre-gl/src/lib/control/geolocate-control.directive';
import { FullscreenControlDirective } from '../../../../../ngx-maplibre-gl/src/lib/control/fullscreen-control.directive';
import { AttributionControlDirective } from '../../../../../ngx-maplibre-gl/src/lib/control/attribution-control.directive';
import { MatButtonModule } from '@angular/material/button';
import { ControlComponent } from '../../../../../ngx-maplibre-gl/src/lib/control/control.component';
import { NgIf } from '@angular/common';
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
    >
      <ng-container *ngIf="visible">
        <mgl-control>
          <button
            mat-fab
            color="primary"
            class="custom-control"
            (click)="alert('Hello')"
          >
            Hello
          </button>
        </mgl-control>
        <mgl-control mglAttribution position="top-right"></mgl-control>
        <mgl-control mglFullscreen position="top-right"></mgl-control>
        <mgl-control
          mglGeolocate
          position="top-right"
          (geolocate)="onGeolocate($event)"
        ></mgl-control>
        <mgl-control mglNavigation position="top-right"></mgl-control>
        <mgl-control mglScale position="top-right"></mgl-control>
      </ng-container>

      <mgl-control position="bottom-right">
        <button
          mat-flat-button
          color="accent"
          (click)="toggleControls()"
        >
          {{ visible ? 'Hide Controls' : 'Show Controls'}}
        </button>
      </mgl-control>
    </mgl-map>
  `,
    styleUrls: ['./examples.css'],
    standalone: true,
    imports: [
        MapComponent,
        MglMapResizeDirective,
        MapTestingHelperDirective,
        NgIf,
        ControlComponent,
        MatButtonModule,
        AttributionControlDirective,
        FullscreenControlDirective,
        GeolocateControlDirective,
        NavigationControlDirective,
        ScaleControlDirective,
    ],
})
export class NgxCustomControlComponent {
  visible = true;

  alert(message: string) {
    alert(message);
  }
  onGeolocate(position: Position) {
    console.log('geolocate', position);
  }
  toggleControls() {
    this.visible = !this.visible;
  }
}
