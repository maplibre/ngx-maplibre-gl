import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  LayerComponent,
  MapComponent,
  VectorSourceComponent,
} from '@maplibre/ngx-maplibre-gl';
import type { LayerSpecification } from 'maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[3]"
      [center]="[-71.97722138410576, -13.517379300798098]"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-vector-source
        id="countries"
        [tiles]="['https://demotiles.maplibre.org/tiles/{z}/{x}/{y}.pbf']"
      >
      </mgl-vector-source>
      <mgl-vector-source
        id="everything"
        url="https://api.maptiler.com/tiles/v3/tiles.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL"
      >
      </mgl-vector-source>
      <mgl-layer
        id="countries-layer"
        type="line"
        source="countries"
        [layout]="layouts()['countries']"
        [paint]="{
          'line-color': 'blue'
        }"
        sourceLayer="countries"
      >
      </mgl-layer>
      <mgl-layer
        id="names"
        type="symbol"
        source="everything"
        [layout]="layouts()['names']"
        sourceLayer="place"
      >
      </mgl-layer>
    </mgl-map>
    <div class="menu">
      <mat-button-toggle
        [checked]="true"
        value="names"
        (change)="toggleLayer($event)"
        ><span data-cy="countries-toggle-button"
          >countries names</span
        ></mat-button-toggle
      >
      <mat-button-toggle
        [checked]="true"
        value="countries"
        (change)="toggleLayer($event)"
        ><span data-cy="countries-toggle-borders"
          >countries border</span
        ></mat-button-toggle
      >
    </div>
  `,
  styleUrls: ['./examples.css', './toggle-layers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MapComponent,
    VectorSourceComponent,
    LayerComponent,
    MatButtonToggleModule,
  ],
})
export class ToggleLayersComponent {
  readonly layouts = signal<{ [key: string]: LayerSpecification['layout'] }>({
    countries: {
      visibility: 'none',
    },
    names: {
      visibility: 'none',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'text-field': '{name:latin}',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'text-size': 30,
    },
  });

  toggleLayer(evt: { value: string }) {
    this.layouts.update((layouts) => ({
      ...layouts,
      [evt.value]: {
        ...layouts[evt.value],
        visibility:
          (layouts[evt.value] as any).visibility === 'visible'
            ? 'none'
            : 'visible',
      },
    }));
  }
}
