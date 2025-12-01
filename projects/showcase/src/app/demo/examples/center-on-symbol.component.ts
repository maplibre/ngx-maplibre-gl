import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MapMouseEvent } from 'maplibre-gl';
import {
  MapComponent,
  FeatureComponent,
  GeoJSONSourceComponent,
  LayerComponent,
} from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [mapStyle]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[8]"
      [center]="center()"
      [cursorStyle]="cursorStyle()"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-geojson-source id="symbols-source">
        @for (geometry of geometries; track geometry) {
          <mgl-feature [geometry]="geometry"/>
        }
      </mgl-geojson-source>
      <mgl-layer
        id="symbols"
        type="symbol"
        source="symbols-source"
        [layout]="{
          'icon-image': 'oneway'
        }"
        (layerClick)="centerMapTo($event)"
        (layerMouseEnter)="changeCursorStyle('pointer')"
        (layerMouseLeave)="changeCursorStyle('')"
      >
      </mgl-layer>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [
    MapComponent,
    GeoJSONSourceComponent,
    FeatureComponent,
    LayerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CenterOnSymbolComponent {
  readonly cursorStyle = signal('');

  readonly center = signal([-90.96, -0.47]);

  readonly geometries = [
    {
      type: 'Point',
      coordinates: [-91.395263671875, -0.9145729757782163],
    },
    {
      type: 'Point',
      coordinates: [-90.32958984375, -0.6344474832838974],
    },
    {
      type: 'Point',
      coordinates: [-91.34033203125, 0.01647949196029245],
    },
  ];

  centerMapTo(evt: MapMouseEvent): void {
    this.center.set((evt as any).features[0].geometry.coordinates);
  }

  changeCursorStyle(value: string): void {
    this.cursorStyle.set(value);
  }
}
