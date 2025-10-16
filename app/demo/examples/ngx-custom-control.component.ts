import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  AttributionControlDirective,
  ControlComponent,
  FullscreenControlDirective,
  GeolocateControlDirective,
  MapComponent,
  NavigationControlDirective,
  Position,
  ScaleControlDirective,
} from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      @if (visible()) {
        <mgl-control>
          <button
            mat-fab
            color="primary"
            class="custom-control"
            data-cy="custom-control"
            (click)="alert('Hello')"
          >
            Hello
          </button>
        </mgl-control>
        <mgl-control mglAttribution position="top-right"/>
        <mgl-control mglFullscreen position="top-right"/>
        <mgl-control
          mglGeolocate
          position="top-right"
          (geolocate)="onGeolocate($event)"
        ></mgl-control>
        <mgl-control mglNavigation position="top-right"/>
        <mgl-control mglScale position="top-right"/>
      }

      <mgl-control position="bottom-right">
        <button
          mat-flat-button
          color="accent"
          (click)="toggleControls()"
          data-cy="toggle-show-controls"
        >
          {{ visible() ? 'Hide Controls' : 'Show Controls' }}
        </button>
      </mgl-control>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [
    MapComponent,
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
  readonly visible = signal(true);

  alert(message: string) {
    alert(message);
  }
  onGeolocate(position: Position) {
    console.log('geolocate', position);
  }
  toggleControls() {
    this.visible.update((v) => !v);
  }
}
