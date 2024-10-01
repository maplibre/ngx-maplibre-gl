import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from "@angular/core";
import {
  MapComponent,
  GeoJSONSourceComponent,
  LayerComponent,
} from "@maplibre/ngx-maplibre-gl";
import data from "./hike.geo.json";

type LineStringData = GeoJSON.FeatureCollection<GeoJSON.LineString>;
const LINE_STRING_DATA = data as LineStringData;

@Component({
  selector: "showcase-demo",
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[14]"
      [center]="center()"
      [centerWithPanTo]="true"
      [pitch]="30"
      movingMethod="jumpTo"
      [preserveDrawingBuffer]="true"
    >
      @if (data(); as dataValue) {
      <mgl-geojson-source id="trace" [data]="dataValue" />
      <mgl-layer
        id="trace"
        type="line"
        source="trace"
        [paint]="{
            'line-color': 'yellow',
            'line-opacity': 0.75,
            'line-width': 5,
          }"
      />
      }
    </mgl-map>
  `,
  styleUrls: ["./examples.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MapComponent, GeoJSONSourceComponent, LayerComponent],
})
export class LiveUpdateFeatureComponent {
  private readonly destroyRef = inject(DestroyRef);
  readonly data = signal<LineStringData>(LINE_STRING_DATA);
  readonly center = signal<number[]>(
    LINE_STRING_DATA.features[0].geometry!.coordinates[0]
  );

  constructor() {
    let timer: ReturnType<typeof setTimeout>;
    afterNextRender(() => {
      const coordinates = LINE_STRING_DATA.features[0].geometry!.coordinates;
      LINE_STRING_DATA.features[0].geometry!.coordinates = [coordinates[0]];
      this.center.set(coordinates[0]);
      let i = 0;
      timer = setInterval(() => {
        if (i < coordinates.length) {
          this.center.set(coordinates[i]);
          LINE_STRING_DATA.features[0].geometry!.coordinates.push(
            coordinates[i]
          );
          this.data.set(LINE_STRING_DATA);
          i++;
        } else {
          clearInterval(timer);
        }
      }, 10);
    });

    this.destroyRef.onDestroy(() => clearInterval(timer));
  }
}
