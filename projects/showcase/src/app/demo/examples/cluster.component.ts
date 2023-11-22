import { Component, OnInit } from '@angular/core';
import { MapComponent, GeoJSONSourceComponent, LayerComponent } from '@maplibre/ngx-maplibre-gl';
import { NgIf } from '@angular/common';
import { MapTestingHelperDirective } from '../../helper/map-testing-helper.directive';
import { MglMapResizeDirective } from '../mgl-map-resize.directive';

@Component({
    selector: 'showcase-demo',
    template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[3]"
      [center]="[-103.59179687498357, 40.66995747013945]"
    >
      <ng-container *ngIf="earthquakes">
        <mgl-geojson-source
          id="earthquakes"
          [data]="earthquakes"
          [cluster]="true"
          [clusterMaxZoom]="14"
          [clusterRadius]="50"
        >
        </mgl-geojson-source>
        <mgl-layer
          id="clusters"
          type="circle"
          source="earthquakes"
          [filter]="['has', 'point_count']"
          [paint]="{
            'circle-color': {
              property: 'point_count',
              type: 'interval',
              stops: [
                [0, '#51bbd6'],
                [100, '#f1f075'],
                [750, '#f28cb1']
              ]
            },
            'circle-radius': {
              property: 'point_count',
              type: 'interval',
              stops: [
                [0, 20],
                [100, 30],
                [750, 40]
              ]
            }
          }"
        >
        </mgl-layer>
        <mgl-layer
          id="cluster-count"
          type="symbol"
          source="earthquakes"
          [filter]="['has', 'point_count']"
          [layout]="{
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
          }"
        >
        </mgl-layer>
        <mgl-layer
          id="unclustered-point"
          type="circle"
          source="earthquakes"
          [filter]="['!has', 'point_count']"
          [paint]="{
            'circle-color': '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
          }"
        >
        </mgl-layer>
      </ng-container>
    </mgl-map>
  `,
    styleUrls: ['./examples.css'],
    standalone: true,
    imports: [
        MapComponent,
        MglMapResizeDirective,
        MapTestingHelperDirective,
        NgIf,
        GeoJSONSourceComponent,
        LayerComponent,
    ],
})
export class ClusterComponent implements OnInit {
  earthquakes: object;

  async ngOnInit() {
    this.earthquakes = await import('./earthquakes.geo.json');
  }
}
