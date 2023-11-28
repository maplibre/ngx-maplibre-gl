import { Component } from '@angular/core';
import {
  MapComponent,
  ControlComponent,
  AttributionControlDirective,
  FullscreenControlDirective,
  GeolocateControlDirective,
  NavigationControlDirective,
  ScaleControlDirective,
  Position,
} from '@maplibre/ngx-maplibre-gl';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MglMapResizeDirective } from '../mgl-map-resize.directive';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [preserveDrawingBuffer]="true"
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
        <button mat-flat-button color="accent" (click)="toggleControls()">
          {{ visible ? 'Hide Controls' : 'Show Controls' }}
        </button>
      </mgl-control>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  standalone: true,
  imports: [
    MapComponent,
    MglMapResizeDirective,
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
