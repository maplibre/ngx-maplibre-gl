import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type {
  CircleLayerSpecification,
  SymbolLayerSpecification,
  ExpressionSpecification,
  GeoJSONSourceSpecification,
  MapGeoJSONFeature
} from 'maplibre-gl';
import {
  MapComponent,
  LayerComponent,
  MarkersForClustersComponent,
  GeoJSONSourceComponent,
  ClusterPointDirective
} from '@maplibre/ngx-maplibre-gl';

type DonuSegmentData = {
  r: number;
  r0: number;
}

@Component({
  selector: 'showcase-cluster-point',
  template: `
    <svg
      [attr.width]="w()"
      [attr.height]="w()"
      [attr.viewbox]="viewbox()"
      text-anchor="middle"
      [style.font]="font()"
    >
      @for (segment of segments(); track segment) {
      <path [attr.d]="segment.d" [style.fill]="segment.fill" />
      }
      <circle [attr.cx]="r()" [attr.cy]="r()" [attr.r]="r0()" fill="white" />
      <text dominant-baseline="central" [attr.transform]="textTransform()">
        {{ totalString() }}
      </text>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClusterPointComponent {
  readonly properties = input<MapGeoJSONFeature['properties']>();

  readonly counts = computed(() => {
    const properties = this.properties();
    return [
      properties?.mag1,
      properties?.mag2,
      properties?.mag3,
      properties?.mag4,
      properties?.mag5,
    ];
  });

  readonly data = computed(() => {
    const counts = this.counts();
    const offsets: number[] = [];
    let total = 0;
    for (let i = 0; i < counts.length; i++) {
      offsets.push(total);
      total += counts[i];
    }
    return { offsets, total };
  });
  readonly total = computed(() => this.data().total);
  readonly offsets = computed(() => this.data().offsets);

  readonly fontSize = computed(() => {
    const total = this.total();
    return total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
  });

  readonly font = computed(() => `${this.fontSize()}px sans-serif`);
  readonly r = computed(() => {
    const total = this.total();
    return total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18;;
  });

  readonly r0 = computed(() => Math.round(this.r() * 0.6));
  readonly w = computed(() => this.r() * 2);
  readonly viewbox = computed(() => `0 0 ${this.w()} ${this.w()}`);
  readonly textTransform = computed(() => `translate(${this.r()}, ${this.r()})`);

  readonly segments = computed(() => {
    const counts = this.counts();
    const offsets = this.offsets();
    const total = this.total();
    const r = this.r();
    const r0 = this.r0();
    const segments = [];
    for (let i = 0; i < counts.length; i++) {
      segments.push(
        this.donutSegment(
          { r, r0 },
          offsets[i] / total,
          (offsets[i] + counts[i]) / total,
          COLORS[i]
        )
      );
    }
    return segments;
  });


  readonly totalString = computed(() => this.total().toLocaleString());


  private donutSegment({ r, r0 }: DonuSegmentData, start: number, end: number, color: string) {
    if (end - start === 1) {
      end -= 0.00001;
    }
    const a0 = 2 * Math.PI * (start - 0.25);
    const a1 = 2 * Math.PI * (end - 0.25);
    const x0 = Math.cos(a0),
      y0 = Math.sin(a0);
    const x1 = Math.cos(a1),
      y1 = Math.sin(a1);
    const largeArc = end - start > 0.5 ? 1 : 0;
    return {
      d: `M ${r + r0 * x0} ${r + r0 * y0} L ${r + r * x0
        } ${r + r * y0} A ${r} ${r} 0 ${largeArc} 1 ${r + r * x1
        } ${r + r * y1} L ${r + r0 * x1} ${r + r0 * y1
        } A ${r0} ${r0} 0 ${largeArc} 0 ${r + r0 * x0} ${r + r0 * y0
        }`,
      fill: color,
    };
  }
}

/**
 * Remember: mgl-layer are way faster than html markers
 * Html markers are fine if you don't have lots of points
 * Try to draw your point with a mgl-layer before using html markers
 * This example only use html markers for cluster points
 * Look at ngx-cluster-html example if you need markers for all points
 */

// colors to use for the categories
const COLORS = ['#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c'];

// filters for classifying earthquakes into five categories based on magnitude
const MAG1 = ['<', ['get', 'mag'], 2] as ExpressionSpecification;

const MAG2 = [
  'all',
  ['>=', ['get', 'mag'], 2],
  ['<', ['get', 'mag'], 3],
] as ExpressionSpecification;

const MAG3 = [
  'all',
  ['>=', ['get', 'mag'], 3],
  ['<', ['get', 'mag'], 4],
] as ExpressionSpecification;

const MAG4 = [
  'all',
  ['>=', ['get', 'mag'], 4],
  ['<', ['get', 'mag'], 5],
] as ExpressionSpecification;

const MAG5 = ['>=', ['get', 'mag'], 5];


@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[0.3]"
      [center]="[0, 20]"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-geojson-source
        id="earthquakes"
        data="https://maplibre.org/maplibre-gl-js/docs/assets/earthquakes.geojson"
        [cluster]="true"
        [clusterRadius]="80"
        [clusterProperties]="clusterProperties"
      />
      <mgl-markers-for-clusters source="earthquakes">
        <ng-template mglClusterPoint let-feature>
          <showcase-cluster-point
            [properties]="feature.properties"
          />
        </ng-template>
      </mgl-markers-for-clusters>
      <mgl-layer
        id="earthquake_circle"
        type="circle"
        source="earthquakes"
        [filter]="['!=', 'cluster', true]"
        [paint]="circlePaint"
      />
      <mgl-layer
        id="earthquake_label"
        type="symbol"
        source="earthquakes"
        [filter]="['!=', 'cluster', true]"
        [layout]="labelLayout"
        [paint]="labelPaint"
      />
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [
    MapComponent,
    GeoJSONSourceComponent,
    MarkersForClustersComponent,
    ClusterPointDirective,
    ClusterPointComponent,
    LayerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClusterHtmlComponent {
  readonly clusterProperties: GeoJSONSourceSpecification['clusterProperties'] = {
    // keep separate counts for each magnitude category in a cluster
    mag1: ['+', ['case', MAG1, 1, 0]],
    mag2: ['+', ['case', MAG2, 1, 0]],
    mag3: ['+', ['case', MAG3, 1, 0]],
    mag4: ['+', ['case', MAG4, 1, 0]],
    mag5: ['+', ['case', MAG5, 1, 0]],
  };

  readonly circlePaint: CircleLayerSpecification['paint'] = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'circle-color': [
      'case',
      MAG1,
      COLORS[0],
      MAG2,
      COLORS[1],
      MAG3,
      COLORS[2],
      MAG4,
      COLORS[3],
      COLORS[4],
    ],
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'circle-opacity': 0.6,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'circle-radius': 12,
  };
  readonly labelLayout: SymbolLayerSpecification['layout'] = {
    // typings issue
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'text-field': [
      'number-format',
      ['get', 'mag'],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      { 'min-fraction-digits': 1, 'max-fraction-digits': 1 },
    ],
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'text-size': 10,
  };
  readonly labelPaint: SymbolLayerSpecification['paint'] = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'text-color': ['case', ['<', ['get', 'mag'], 3], 'black', 'white'],
  };
}
