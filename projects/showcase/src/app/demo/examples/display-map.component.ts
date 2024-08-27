import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MapComponent } from "@maplibre/ngx-maplibre-gl";

@Component({
  selector: "showcase-demo",
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[9]"
      [center]="[-74.5, 40]"
      [preserveDrawingBuffer]="true"
    />
  `,
  styleUrls: ["./examples.css"],
  standalone: true,
  imports: [MapComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayMapComponent {}
