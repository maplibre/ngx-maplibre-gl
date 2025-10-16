import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  MapComponent,
  ImageSourceComponent,
  LayerComponent,
} from '@maplibre/ngx-maplibre-gl';
import { interval, map, shareReplay, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [center]="center()"
      [zoom]="[14]"
      movingMethod="jumpTo"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-image-source
        id="test_source"
        [url]="url()"
        [coordinates]="coordinates()"
      />

      <mgl-layer
        id="test_layer"
        source="test_source"
        type="raster"
        [paint]="{ 'raster-fade-duration': 0 }"
      />
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  imports: [MapComponent, ImageSourceComponent, LayerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveUpdateImageSourceComponent {
  private readonly httpClient = inject(HttpClient);
  private readonly size = 0.001;

  private readonly hike$ = this.httpClient.get<GeoJSON.FeatureCollection<GeoJSON.LineString>>('assets/data/hike.geo.json')
    .pipe(
      map(hike => {
        const points = hike.features[0].geometry!.coordinates;
        const coordinates = points.map((c: number[]) => this.makeRectangle(c));
        return { points, coordinates };
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );

  private readonly data$ = this.hike$.pipe(
    switchMap(d =>
      interval(250).pipe(
        startWith(0),
        map(i => {
          const index = (i + 1) % d.coordinates.length;
          const center = d.points[0];
          const coordinates = d.coordinates[index];
          return { index, center, coordinates };
        }),
      )
    )
  );

  private readonly dataSig = toSignal(this.data$, { initialValue: { index: 0, center: [0, 0], coordinates: this.makeRectangle([0, 0]) } });

  readonly coordinates = computed(() => {
    const d = this.dataSig();
    return d.coordinates;
  });

  readonly center = computed(() => {
    const d = this.dataSig();
    return d.center;
  });

  readonly url = linkedSignal({
    source: this.dataSig,
    computation: () => (Math.random() < 0.5 ? 'assets/red.png' : 'assets/blue.png'),
  });

  private makeRectangle([long, lat]: number[]): number[][] {
    return [
      [long, lat],
      [long + this.size, lat],
      [long + this.size, lat - this.size],
      [long, lat - this.size],
    ];
  }
}
