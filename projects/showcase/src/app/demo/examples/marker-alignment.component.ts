import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MapComponent, MarkerComponent } from '@maplibre/ngx-maplibre-gl';
import { interval, scan, startWith } from 'rxjs';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [interactive]="false"
      movingMethod="jumpTo"
      [mapStyle]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [pitch]="[pitch()]"
      [bearing]="[bearing()]"
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkerAlignmentComponent {

  readonly angle = toSignal<number>(
    interval(20).pipe(
      scan((a) => {
        const next = a + 0.01;
        return next >= 1 ? 0 : next;
      }, 0),
      startWith(0)
    ),
    { requireSync: true }
  );

  readonly pitch = computed(() => 45 + 15 * Math.cos(this.angle()));
  readonly bearing = computed(() => -103 + 20 * Math.sin(this.angle()));
}

