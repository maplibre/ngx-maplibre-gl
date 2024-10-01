import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnDestroy,
  afterNextRender,
  inject,
  signal,
} from "@angular/core";
import {
  MapComponent,
  ImageSourceComponent,
  LayerComponent,
} from "@maplibre/ngx-maplibre-gl";
import data from "./hike.geo.json";

@Component({
  selector: "showcase-demo",
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [center]="center()"
      [zoom]="[14]"
      movingMethod="jumpTo"
      [preserveDrawingBuffer]="true"
    >
      <mgl-image-source
        id="test_source"
        [url]="url()"
        [coordinates]="coordinates()"
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
  styleUrls: ["./examples.css"],
  standalone: true,
  imports: [MapComponent, ImageSourceComponent, LayerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveUpdateImageSourceComponent implements OnDestroy {
  private readonly ngZone = inject(NgZone);

  private timer: ReturnType<typeof setInterval>;
  private readonly size = 0.001;

 readonly center = signal<number[]>(data.features[0].geometry!.coordinates[0]);
 readonly coordinates = signal<number[][]>(this.makeRectangle(this.center()));
 readonly url = signal("assets/red.png");

  constructor() {
    afterNextRender(() => {
      const points = data.features[0].geometry!.coordinates;
      const coordinates = points.map((c: number[]) => this.makeRectangle(c));

      this.center.set(points[0]);
      this.coordinates.set(coordinates[0]);

      let i = 0;

      this.timer = setInterval(() => {
        this.ngZone.run(() => {
          this.url.set(Math.random() < 0.5 ? "assets/red.png" : "assets/blue.png");
          this.coordinates.set(coordinates[i]);
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
