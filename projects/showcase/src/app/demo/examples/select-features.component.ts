import { Component, effect, signal, viewChild } from '@angular/core';
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
      [zoom]="[3]"
      [center]="[-100.486052, 37.830348]"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-geojson-source
        id="states"
        data="https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces.geojson"
        promoteId="adm1_code"
      >
      </mgl-geojson-source>
      <mgl-layer
        id="state-fills"
        type="fill"
        source="states"
        [paint]="{
          'fill-color': [
            'case', 
            ['boolean', ['feature-state', 'selected'], false], 
            '#FF8C00',
            '#627BC1',
          ],
          'fill-opacity': 0.5
        }"
        (layerMouseMove)="onHover($event)"
        (layerMouseLeave)="onHover($event)"
        (layerClick)="onClick()"
      >
      </mgl-layer>
      <mgl-layer
        id="state-borders-unselected"
        type="line"
        source="states"
        [paint]="{
          'line-color': '#627BC1',
          'line-width': [
            'case', 
            ['boolean', ['feature-state', 'hover'], false], 
            4, 
            2
          ],
          'line-opacity': [
            'case', 
            ['boolean', ['feature-state', 'selected'], false], 
            0, 
            1,
          ],
        }"
      >
      </mgl-layer>
      <!-- feature-state doesn't work with line-sort-key properly -->
      <mgl-layer
        id="state-borders-selected"
        type="line"
        source="states"
        [paint]="{
          'line-color': '#FF8C00',
          'line-width': [
            'case', 
            ['boolean', ['feature-state', 'hover'], false], 
            4, 
            2
          ],
          'line-opacity': [
            'case', 
            ['boolean', ['feature-state', 'selected'], false], 
            1, 
            0,
          ],
        }"
      >
      </mgl-layer>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent, GeoJSONSourceComponent, LayerComponent],
})
export class SelectFeaturesComponent {
  readonly hover = signal<string | undefined>(undefined);
  protected source = viewChild(GeoJSONSourceComponent);

  constructor() {
    let previousHover: string | undefined = undefined;
    effect(() => {
      const source = this.source();
      if (!source) return;

      const hover = this.hover();
      if (hover) source.setFeatureState({id: hover}, {hover: true});
      
      if (previousHover) source.removeFeatureState({id: previousHover}, "hover");
      previousHover = hover;
    });
  }

  onHover(event: {features?: any[]}) {
    this.hover.set(event.features?.[0].id as string);
  }

  onClick() {
    const hover = this.hover();
    const source = this.source();
    if (!hover || !source) return;

    const id = {id: hover};
    const state = source.getFeatureState(id);
    if (state.selected) source.removeFeatureState(id, "selected");
    else source.setFeatureState(id, {selected: true});
  }
}
