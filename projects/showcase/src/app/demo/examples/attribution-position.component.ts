import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  MapComponent,
  ControlComponent,
  AttributionControlDirective,
} from "@maplibre/ngx-maplibre-gl";

@Component({
  selector: "showcase-demo",
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [center]="[-77.04, 38.907]"
      [zoom]="[11.15]"
      [attributionControl]="false"
      [preserveDrawingBuffer]="true"
    >
      <mgl-control mglAttribution position="top-left"></mgl-control>
    </mgl-map>
  `,
  styleUrls: ["./examples.css"],
  standalone: true,
  imports: [MapComponent, ControlComponent, AttributionControlDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttributionPositionComponent {}
