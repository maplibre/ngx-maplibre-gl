import {
  Component,
  NgZone,
  OnDestroy,
  afterNextRender,
  inject,
} from '@angular/core';
import {
  MapComponent,
  ImageSourceComponent,
  LayerComponent,
} from '@maplibre/ngx-maplibre-gl';
import data from './hike.geo.json';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [center]="center"
      [zoom]="[14]"
      movingMethod="jumpTo"
      [preserveDrawingBuffer]="true"
    >
      <mgl-image-source
        id="test_source"
        [url]="url"
        [coordinates]="coordinates"
      >
      </mgl-image-source>

      <mgl-layer
        id="test_layer"
        source="test_source"
        type="raster"
        [paint]="{ 'raster-fade-duration': 0 }"
      >
      </mgl-layer>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  standalone: true,
  imports: [MapComponent, ImageSourceComponent, LayerComponent],
})
export class LiveUpdateImageSourceComponent implements OnDestroy {
  private readonly ngZone = inject(NgZone);

  private timer: ReturnType<typeof setInterval>;
  private readonly size = 0.001;

  center: number[];
  url = 'assets/red.png';
  coordinates: number[][];

  constructor() {
    this.center = data.features[0].geometry!.coordinates[0];
    this.coordinates = this.makeRectangle(this.center);
    afterNextRender(() => {
      const points = data.features[0].geometry!.coordinates;
      const coordinates = points.map((c: number[]) => this.makeRectangle(c));

      this.center = points[0];
      this.coordinates = coordinates[0];

      let i = 0;

      this.timer = setInterval(() => {
        this.ngZone.run(() => {
          this.url = Math.random() < 0.5 ? 'assets/red.png' : 'assets/blue.png';
          this.coordinates = coordinates[i];
          i = (i + 1) % coordinates.length;
        });
      }, 250);
    });
  }

  ngOnDestroy() {
    if (this.timer !== undefined) {
      clearInterval(this.timer);
    }
  }

  private makeRectangle([long, lat]: number[]): number[][] {
    return [
      [long, lat],
      [long + this.size, lat],
      [long + this.size, lat - this.size],
      [long, lat - this.size],
    ];
  }
}
