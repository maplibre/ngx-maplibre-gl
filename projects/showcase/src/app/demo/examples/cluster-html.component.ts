import { Component, OnInit, input } from '@angular/core';
import type {
  CircleLayerSpecification,
  SymbolLayerSpecification,
  ExpressionSpecification,
  GeoJSONSourceSpecification,
  MapGeoJSONFeature
} from 'maplibre-gl';
import { NgStyle } from '@angular/common';
import {
  MapComponent,
  LayerComponent,
  MarkersForClustersComponent,
  GeoJSONSourceComponent,
  ClusterPointDirective
} from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-cluster-point',
  template: `
    <svg
      [attr.width]="w"
      [attr.height]="w"
      [attr.viewbox]="viewbox"
      text-anchor="middle"
      [ngStyle]="{ font: font }"
    >
      @for (segment of segments; track segment) {
      <path [attr.d]="segment.d" [ngStyle]="{ fill: segment.fill }" />
      }
      <circle [attr.cx]="r" [attr.cy]="r" [attr.r]="r0" fill="white" />
      <text dominant-baseline="central" [attr.transform]="textTransform">
        {{ totalString }}
      </text>
    </svg>
  `,
  standalone: true,
  imports: [NgStyle],
})
export class ClusterPointComponent implements OnInit {
  readonly properties = input<MapGeoJSONFeature['properties']>();

  w: number;
  r: number;
  r0: number;
  viewbox: string;
  font: string;
  segments: { d: string; fill: string }[];
  textTransform: string;
  totalString: string;

  ngOnInit() {
    const offsets = [];
    const properties = this.properties();

    const counts = [
      properties?.mag1,
      properties?.mag2,
      properties?.mag3,
      properties?.mag4,
      properties?.mag5,
    ];
    let total = 0;
    for (let i = 0; i < counts.length; i++) {
      offsets.push(total);
      total += counts[i];
    }
    const fontSize =
      total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
    this.font = `${fontSize}px sans-serif`;
    this.r = total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18;
    this.r0 = Math.round(this.r * 0.6);
    this.w = this.r * 2;
    this.viewbox = `0 0 ${this.w} ${this.w}`;
    this.textTransform = `translate(${this.r}, ${this.r})`;
    this.segments = [];
    for (let i = 0; i < counts.length; i++) {
      this.segments.push(
        this.donutSegment(
          offsets[i] / total,
          (offsets[i] + counts[i]) / total,
          COLORS[i]
        )
      );
    }
    this.totalString = total.toLocaleString();
  }

  private donutSegment(start: number, end: number, color: string) {
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
      d: `M ${this.r + this.r0 * x0} ${this.r + this.r0 * y0} L ${
        this.r + this.r * x0
      } ${this.r + this.r * y0} A ${this.r} ${this.r} 0 ${largeArc} 1 ${
        this.r + this.r * x1
      } ${this.r + this.r * y1} L ${this.r + this.r0 * x1} ${
        this.r + this.r0 * y1
      } A ${this.r0} ${this.r0} 0 ${largeArc} 0 ${this.r + this.r0 * x0} ${
        this.r + this.r0 * y0
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

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[0.3]"
      [center]="[0, 20]"
      [preserveDrawingBuffer]="true"
    >
      <mgl-geojson-source
        id="earthquakes"
        data="https://maplibre.org/maplibre-gl-js/docs/assets/earthquakes.geojson"
        [cluster]="true"
        [clusterRadius]="80"
        [clusterProperties]="clusterProperties"
      ></mgl-geojson-source>
      <mgl-markers-for-clusters source="earthquakes">
        <ng-template mglClusterPoint let-feature>
          <showcase-cluster-point
            [properties]="feature.properties"
          ></showcase-cluster-point>
        </ng-template>
      </mgl-markers-for-clusters>
      <mgl-layer
        id="earthquake_circle"
        type="circle"
        source="earthquakes"
        [filter]="['!=', 'cluster', true]"
        [paint]="circlePaint"
      ></mgl-layer>
      <mgl-layer
        id="earthquake_label"
        type="symbol"
        source="earthquakes"
        [filter]="['!=', 'cluster', true]"
        [layout]="labelLayout"
        [paint]="labelPaint"
      ></mgl-layer>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  standalone: true,
  imports: [
    MapComponent,
    GeoJSONSourceComponent,
    MarkersForClustersComponent,
    ClusterPointDirective,
    ClusterPointComponent,
    LayerComponent,
  ],
})
export class ClusterHtmlComponent {
  clusterProperties: GeoJSONSourceSpecification['clusterProperties'];
  circlePaint: CircleLayerSpecification['paint'];
  labelLayout: SymbolLayerSpecification['layout'];
  labelPaint: SymbolLayerSpecification['paint'];

  constructor() {
    // filters for classifying earthquakes into five categories based on magnitude
    const mag1 = ['<', ['get', 'mag'], 2] as ExpressionSpecification;
    const mag2 = [
      'all',
      ['>=', ['get', 'mag'], 2],
      ['<', ['get', 'mag'], 3],
    ] as ExpressionSpecification;
    const mag3 = [
      'all',
      ['>=', ['get', 'mag'], 3],
      ['<', ['get', 'mag'], 4],
    ] as ExpressionSpecification;
    const mag4 = [
      'all',
      ['>=', ['get', 'mag'], 4],
      ['<', ['get', 'mag'], 5],
    ] as ExpressionSpecification;
    const mag5 = ['>=', ['get', 'mag'], 5];

    this.clusterProperties = {
      // keep separate counts for each magnitude category in a cluster
      mag1: ['+', ['case', mag1, 1, 0]],
      mag2: ['+', ['case', mag2, 1, 0]],
      mag3: ['+', ['case', mag3, 1, 0]],
      mag4: ['+', ['case', mag4, 1, 0]],
      mag5: ['+', ['case', mag5, 1, 0]],
    };
    this.circlePaint = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'circle-color': [
        'case',
        mag1,
        COLORS[0],
        mag2,
        COLORS[1],
        mag3,
        COLORS[2],
        mag4,
        COLORS[3],
        COLORS[4],
      ],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'circle-opacity': 0.6,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'circle-radius': 12,
    };
    this.labelLayout = {
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
    this.labelPaint = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'text-color': ['case', ['<', ['get', 'mag'], 3], 'black', 'white'],
    };
  }
}
