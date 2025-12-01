import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MapLayerMouseEvent } from 'maplibre-gl';
import {
  MapComponent,
  PopupComponent,
  LayerComponent,
  GeoJSONSourceComponent,
} from '@maplibre/ngx-maplibre-gl';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [mapStyle]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[11.15]"
      [center]="[-77.04, 38.907]"
      [cursorStyle]="cursorStyle()"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-geojson-source id="points" [data]="points.value()"/>

      <mgl-layer
        id="points"
        source="points"
        type="symbol"
        [layout]="{
          'icon-image': ['get', 'icon'],
          'icon-allow-overlap': true
        }"
        (layerClick)="onClick($event)"
        (layerMouseEnter)="changeCursorStyle('pointer')"
        (layerMouseLeave)="changeCursorStyle('')"
      />
      @if (selectedPoint(); as selectedPointValue) {
        <mgl-popup [feature]="selectedPointValue">
          <span [innerHTML]="selectedPointValue.properties?.description"></span>
        </mgl-popup>
      }
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [
    MapComponent,
    GeoJSONSourceComponent,
    LayerComponent,
    PopupComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupOnClickComponent {
  readonly points = httpResource<GeoJSON.FeatureCollection<GeoJSON.Point>>(() => 'assets/data/points.geo.json');
  readonly selectedPoint = signal<GeoJSON.Feature | null>(null);
  readonly cursorStyle = signal('');

  onClick(evt: MapLayerMouseEvent): void {
    this.selectedPoint.set(evt.features![0]);
  }

  changeCursorStyle(value: string): void {
    this.cursorStyle.set(value);
  }
}
