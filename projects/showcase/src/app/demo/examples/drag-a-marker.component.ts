import { Component } from '@angular/core';
import { Marker } from 'maplibre-gl';
import { MatCardModule } from '@angular/material/card';
import { ControlComponent } from '../../../../../ngx-maplibre-gl/src/lib/control/control.component';
import { NgIf } from '@angular/common';
import { MarkerComponent } from '../../../../../ngx-maplibre-gl/src/lib/marker/marker.component';
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
      [zoom]="[2]"
      [center]="[0, 0]"
    >
      <mgl-marker
        [lngLat]="[0, 0]"
        [draggable]="true"
        (markerDragEnd)="onDragEnd($event)"
      ></mgl-marker>
      <mgl-control *ngIf="coordinates" position="bottom-left">
        <mat-card appearance="outlined">
          <div>Longitude:&nbsp;{{ coordinates[0] }}</div>
          <div>Latitude:&nbsp;{{ coordinates[1] }}</div>
        </mat-card>
      </mgl-control>
    </mgl-map>
  `,
    styleUrls: ['./examples.css'],
    standalone: true,
    imports: [
        MapComponent,
        MglMapResizeDirective,
        MapTestingHelperDirective,
        MarkerComponent,
        NgIf,
        ControlComponent,
        MatCardModule,
    ],
})
export class DragAMarkerComponent {
  coordinates: number[];
  color = '#3887be';

  onDragEnd(marker: Marker) {
    this.coordinates = marker.getLngLat().toArray();
  }
}
