import { Component, computed, inject } from '@angular/core';
import {
  MapComponent,
  GeoJSONSourceComponent,
  LayerComponent,
} from '@maplibre/ngx-maplibre-gl';
import { interval, map, shareReplay, startWith, switchMap, take, } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [mapStyle]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[14]"
      [center]="center() ?? [0, 0]"
      [centerWithPanTo]="true"
      [pitch]="30"
      movingMethod="jumpTo"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      @if (data(); as dataValue) {
        <mgl-geojson-source id="trace" [data]="dataValue"/> 
        <mgl-layer
          id="trace"
          type="line"
          source="trace"
          [paint]="{
            'line-color': 'yellow',
            'line-opacity': 0.75,
            'line-width': 5,
          }"
        >
        </mgl-layer>
      }
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent, GeoJSONSourceComponent, LayerComponent],
})
export class LiveUpdateFeatureComponent {
  private readonly httpClient = inject(HttpClient);

  private readonly geoJson$ = this.httpClient.get<GeoJSON.FeatureCollection<GeoJSON.LineString>>('assets/data/hike.geo.json').pipe(
    map(geoJson => {
      const data = structuredClone(geoJson);
      const coordinates = data.features[0].geometry.coordinates;
      data.features[0].geometry.coordinates = [coordinates[0]];
      return { data, coordinates };
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly updatedGeoJson$ = this.geoJson$.pipe(
    switchMap(({ data, coordinates }) => {
      return interval(200).pipe(
        startWith(0),
        map(i => coordinates[i]),
        map(pt => {
          data.features[0].geometry.coordinates.push(pt);
          return { center: pt, data: structuredClone(data) };
        }),
        take(coordinates.length),
      );
    }),
  );

  readonly updatedGeoJson = toSignal(this.updatedGeoJson$, { initialValue: null });
  readonly center = computed(() => this.updatedGeoJson()?.center ?? null);
  readonly data = computed(() => this.updatedGeoJson()?.data ?? null);
}
