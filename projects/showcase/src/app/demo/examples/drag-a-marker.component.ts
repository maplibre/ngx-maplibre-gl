import { Component, signal } from '@angular/core';
import { Marker } from 'maplibre-gl';
import { MatCardModule } from '@angular/material/card';
import {
  MapComponent,
  ControlComponent,
  MarkerComponent,
} from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[2]"
      [center]="[0, 0]"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-marker
        [lngLat]="[0, 0]"
        [draggable]="true"
        (markerDragEnd)="onDragEnd($event)"
      />
      @if (coordinates(); as coordinatesValue) {
        <mgl-control position="bottom-left">
          <mat-card appearance="outlined">
            <div>Longitude:&nbsp;{{ coordinatesValue[0] }}</div>
            <div>Latitude:&nbsp;{{ coordinatesValue[1] }}</div>
          </mat-card>
        </mgl-control>
      }
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent, MarkerComponent, ControlComponent, MatCardModule],
})
export class DragAMarkerComponent {
  readonly coordinates = signal<number[] | null>(null);
  readonly color = '#3887be';

  onDragEnd(marker: Marker) {
    this.coordinates.set(marker.getLngLat().toArray());
  }
}
