import { Component, OnDestroy, afterNextRender } from '@angular/core';
import {
  MapComponent,
  GeoJSONSourceComponent,
  LayerComponent,
} from '@maplibre/ngx-maplibre-gl';
import { NgIf } from '@angular/common';
import data from './hike.geo.json';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="zoom"
      [center]="center"
      [centerWithPanTo]="true"
      [pitch]="pitch"
      movingMethod="jumpTo"
      [preserveDrawingBuffer]="true"
    >
      <mgl-geojson-source *ngIf="data" id="trace" [data]="data">
      </mgl-geojson-source>
      <mgl-layer
        *ngIf="data"
        id="trace"
        type="line"
        source="trace"
        [paint]="{
          'line-color': 'yellow',
          'line-opacity': 0.75,
          'line-width': 5
        }"
      >
      </mgl-layer>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  standalone: true,
  imports: [MapComponent, NgIf, GeoJSONSourceComponent, LayerComponent],
})
export class LiveUpdateFeatureComponent implements OnDestroy {
  data: GeoJSON.FeatureCollection<GeoJSON.LineString>;
  center: number[];
  zoom = [14];
  pitch: number = 30;

  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    this.center = data.features[0].geometry!.coordinates[0];
    this.data = data as GeoJSON.FeatureCollection<GeoJSON.LineString>;
    afterNextRender(() => {
      const coordinates = data.features[0].geometry!.coordinates;
      data.features[0].geometry!.coordinates = [coordinates[0]];
      this.center = coordinates[0];
      let i = 0;
      this.timer = setInterval(() => {
        if (i < coordinates.length) {
          this.center = coordinates[i];
          data.features[0].geometry!.coordinates.push(coordinates[i]);
          this.data = { ...this.data };
          i++;
        } else {
          clearInterval(this.timer);
        }
      }, 10);
    });
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
