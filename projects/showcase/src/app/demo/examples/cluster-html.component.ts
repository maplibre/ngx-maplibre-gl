import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from "@angular/core";
import type {
  CircleLayerSpecification,
  SymbolLayerSpecification,
  ExpressionSpecification,
  GeoJSONSourceSpecification,
  MapGeoJSONFeature,
} from "maplibre-gl";
import { NgStyle } from "@angular/common";
import {
  MapComponent,
  LayerComponent,
  MarkersForClustersComponent,
  GeoJSONSourceComponent,
  ClusterPointDirective,
} from "@maplibre/ngx-maplibre-gl";

@Component({
  selector: "showcase-cluster-point",
  template: `
    <svg
      [attr.width]="w()"
      [attr.height]="w()"
      [attr.viewbox]="viewbox()"
      text-anchor="middle"
      [ngStyle]="{ font: font() }"
    >
      @for (segment of segments(); track segment) {
      <path [attr.d]="segment.d" [ngStyle]="{ fill: segment.fill }" />
      }
      <circle [attr.cx]="r()" [attr.cy]="r()" [attr.r]="r0()" fill="white" />
      <text dominant-baseline="central" [attr.transform]="textTransform()">
        {{ totalString() }}
      </text>
    </svg>
  `,
  standalone: true,
  imports: [NgStyle],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClusterPointComponent {
  readonly properties = input<MapGeoJSONFeature["properties"]>();
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

  readonly totalOffsets = computed(() => {
    const counts = this.counts();
    const offsets = [];
    let total = 0;

    for (let i = 0; i < counts.length; i++) {
      offsets.push(total);
      total += counts[i];
    }
    return { total, offsets };
  });

  readonly fontSize = computed(() => {
    const { total } = this.totalOffsets();
    return total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
  });

  readonly font = computed(() => `${this.fontSize()}px sans-serif`);

  readonly r = computed(() => {
    const { total } = this.totalOffsets();
    return total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18;
  });

  readonly r0 = computed(() => Math.round(this.r() * 0.6));

  readonly w = computed(() => this.r() * 2);

  readonly viewbox = computed(() => `0 0 ${this.w()} ${this.w()}`);

  readonly textTransform = computed(
    () => `translate(${this.r()}, ${this.r()})`
  );

  readonly segments = computed(() => {
    const segments: { d: string; fill: string }[] = [];
    const { total, offsets } = this.totalOffsets();
    const counts = this.counts();
    for (let i = 0; i < counts.length; i++) {
      segments.push(
        this.donutSegment(
          offsets[i] / total,
          (offsets[i] + counts[i]) / total,
          COLORS[i],
          this.r(),
          this.r0()
        )
      );
    }
    return segments;
  });

  readonly totalString = computed(() =>
    this.totalOffsets().total.toLocaleString()
  );

  private donutSegment(
    start: number,
    end: number,
    color: string,
    r: number,
    r0: number
  ) {
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
      d: `M ${r + r0 * x0} ${r + r0 * y0} L ${r + r * x0} ${
        r + r * y0
      } A ${r} ${r} 0 ${largeArc} 1 ${r + r * x1} ${
        this.r() + this.r() * y1
      } L ${r + r0 * x1} ${r + r0 * y1} A ${r0} ${r0} 0 ${largeArc} 0 ${
        r + r0 * x0
      } ${r + r0 * y0}`,
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
const COLORS = ["#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c"];

// filters for classifying earthquakes into five categories based on magnitude
const MAG_1 = ["<", ["get", "mag"], 2] as ExpressionSpecification;
const MAG_2 = [
  "all",
  [">=", ["get", "mag"], 2],
  ["<", ["get", "mag"], 3],
] as ExpressionSpecification;
const MAG_3 = [
  "all",
  [">=", ["get", "mag"], 3],
  ["<", ["get", "mag"], 4],
] as ExpressionSpecification;
const MAG_4 = [
  "all",
  [">=", ["get", "mag"], 4],
  ["<", ["get", "mag"], 5],
] as ExpressionSpecification;
const MAG_5 = [">=", ["get", "mag"], 5];

@Component({
  selector: "showcase-demo",
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
        [clusterProperties]="clusterProperties()"
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
        [paint]="circlePaint()"
      ></mgl-layer>
      <mgl-layer
        id="earthquake_label"
        type="symbol"
        source="earthquakes"
        [filter]="['!=', 'cluster', true]"
        [layout]="labelLayout()"
        [paint]="labelPaint()"
      ></mgl-layer>
    </mgl-map>
  `,
  styleUrls: ["./examples.css"],
  standalone: true,
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
  readonly clusterProperties = signal<
    GeoJSONSourceSpecification["clusterProperties"]
  >({
    // keep separate counts for each magnitude category in a cluster
    mag1: ["+", ["case", MAG_1, 1, 0]],
    mag2: ["+", ["case", MAG_2, 1, 0]],
    mag3: ["+", ["case", MAG_3, 1, 0]],
    mag4: ["+", ["case", MAG_4, 1, 0]],
    mag5: ["+", ["case", MAG_5, 1, 0]],
  });
  readonly circlePaint = signal<CircleLayerSpecification["paint"]>({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "circle-color": [
      "case",
      MAG_1,
      COLORS[0],
      MAG_2,
      COLORS[1],
      MAG_3,
      COLORS[2],
      MAG_4,
      COLORS[3],
      COLORS[4],
    ],
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "circle-opacity": 0.6,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "circle-radius": 12,
  });

  readonly labelLayout = signal<SymbolLayerSpecification["layout"]>({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "text-field": [
      "number-format",
      ["get", "mag"],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      { "min-fraction-digits": 1, "max-fraction-digits": 1 },
    ],
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "text-size": 10,
  });

  readonly labelPaint = signal<SymbolLayerSpecification["paint"]>({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "text-color": ["case", ["<", ["get", "mag"], 3], "black", "white"],
  });
}
