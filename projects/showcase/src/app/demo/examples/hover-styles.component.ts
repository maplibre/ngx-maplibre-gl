import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  MapComponent,
  GeoJSONSourceComponent,
  LayerComponent,
} from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[2]"
      [center]="[-100.486052, 37.830348]"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-geojson-source
        id="states"
        data="https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces.geojson"
      />
      <mgl-layer
        id="state-fills"
        type="fill"
        source="states"
        [paint]="{
          'fill-color': '#627BC1',
          'fill-opacity': 0.5
        }"
        (layerMouseMove)="activateHoverOn($event)"
        (layerMouseLeave)="disableHover()"
      />
      <mgl-layer
        id="state-borders"
        type="line"
        source="states"
        [paint]="{
          'line-color': '#627BC1',
          'line-width': 2
        }"
      />
      <mgl-layer
        id="state-fills-hover"
        type="fill"
        source="states"
        [paint]="{
          'fill-color': '#627BC1',
          'fill-opacity': 1
        }"
        [filter]="hoverFilter()"
      />
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent, GeoJSONSourceComponent, LayerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoverStylesComponent {
  readonly hoverFilter = signal(['==', 'name', '']);

  activateHoverOn(evt: any) {
    this.hoverFilter.set(['==', 'name', evt.features[0].properties.name]);
  }

  disableHover() {
    this.hoverFilter.set(['==', 'name', '']);
  }
}
