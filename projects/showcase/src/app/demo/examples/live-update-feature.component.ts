import { Component, OnDestroy, OnInit } from '@angular/core';
import { LngLatLike } from 'maplibre-gl';
import {
  MapComponent,
  GeoJSONSourceComponent,
  LayerComponent,
} from '@maplibre/ngx-maplibre-gl';
import { NgIf } from '@angular/common';

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
export class LiveUpdateFeatureComponent implements OnInit, OnDestroy {
  data: GeoJSON.FeatureCollection<GeoJSON.LineString>;
  center: LngLatLike;
  zoom = [0];
  pitch: number;

  private timer: NodeJS.Timeout;

  constructor() {}

  async ngOnInit() {
    const data: GeoJSON.FeatureCollection<GeoJSON.LineString> = (await import(
      './hike.geo.json'
    )) as any;
    const coordinates = data.features[0].geometry!.coordinates;
    data.features[0].geometry!.coordinates = [coordinates[0]];
    this.data = data;
    this.center = <[number, number]>coordinates[0];
    this.zoom = [14];
    this.pitch = 30;
    let i = 0;
    this.timer = setInterval(() => {
      if (i < coordinates.length) {
        this.center = <[number, number]>coordinates[i];
        data.features[0].geometry!.coordinates.push(coordinates[i]);
        this.data = { ...this.data };
        i++;
      } else {
        clearInterval(this.timer);
      }
    }, 10);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
