import { Component, OnDestroy, afterNextRender } from '@angular/core';
import { MapComponent, MarkerComponent } from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [interactive]="false"
      movingMethod="jumpTo"
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [pitch]="[pitch]"
      [bearing]="[bearing]"
      [zoom]="[17]"
      [center]="[4.577979, 51.038189]"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-marker
        [lngLat]="[4.577979, 51.03816]"
        rotationAlignment="map"
        pitchAlignment="map"
      >
        <div class="arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 434 437">
            <polygon
              points="37.5 437.18 218 350.75 217.49 -0.37 37.5 437.18"
              style="fill:#579120"
            />
            <polygon
              points="397.55 437.13 218 350.75 217.49 -0.37 397.55 437.13"
              style="fill:#6fad2d"
            />
            <polygon
              points="217.22 391.46 397.55 437.13 218 350.75 37.5 437.18 217.22 391.46"
              style="fill:#315112"
            />
          </svg>
        </div>
      </mgl-marker>
    </mgl-map>
  `,
  styleUrls: ['./examples.css', './marker-alignment.component.css'],
  imports: [MapComponent, MarkerComponent],
})
export class MarkerAlignmentComponent implements OnDestroy {
  pitch = 50;
  bearing = -97;
  timer: ReturnType<typeof setInterval>;

  constructor() {
    afterNextRender(() => {
      let angle = 0;
      this.timer = setInterval(() => {
        angle += 0.01;
        if (angle === 1) {
          angle = 0;
        }
        this.pitch = 45 + 15 * Math.cos(angle);
        this.bearing = -103 + 20 * Math.sin(angle);
      }, 20);
    })
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}

