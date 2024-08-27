import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from "@angular/core";
import { CircleLayerSpecification } from "maplibre-gl";
import {
  MapComponent,
  GeoJSONSourceComponent,
  LayerComponent,
} from "@maplibre/ngx-maplibre-gl";

@Component({
  selector: "showcase-demo",
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[3]"
      [center]="[-103.59179687498357, 40.66995747013945]"
      [preserveDrawingBuffer]="true"
    >
      @if (earthquakes(); as earthquakesValue) {
      <mgl-geojson-source
        id="earthquakes"
        [data]="earthquakesValue"
        [cluster]="true"
        [clusterMaxZoom]="15"
        [clusterRadius]="20"
      />
      @for (layer of clusterLayers(); track layer) {
      <mgl-layer
        [id]="layer.id"
        [type]="layer.type"
        source="earthquakes"
        [filter]="layer.filter"
        [paint]="layer.paint"
      />
      }
      <mgl-layer
        id="unclustered-point"
        type="circle"
        source="earthquakes"
        [filter]="['!=', 'cluster', true]"
        [paint]="{
          'circle-color': 'rgba(0,255,0,0.5)',
          'circle-radius': 20,
          'circle-blur': 1
        }"
      />
      }
    </mgl-map>
  `,
  styleUrls: ["./examples.css"],
  standalone: true,
  imports: [MapComponent, GeoJSONSourceComponent, LayerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeatMapComponent implements OnInit {
  readonly earthquakes = signal<GeoJSON.FeatureCollection | null>(null);
  readonly clusterLayers = signal<CircleLayerSpecification[]>(
    this.getClusterLayers()
  );

  async ngOnInit() {
    this.earthquakes.set((await import("./earthquakes.geo.json")) as any);
  }

  getClusterLayers() {
    const layersData: [number, string][] = [
      [0, "green"],
      [20, "orange"],
      [200, "red"],
    ];

    return layersData.map(
      (data, index) =>
        ({
          type: "circle",
          id: `cluster-${index}`,
          paint: {
            /* eslint-disable @typescript-eslint/naming-convention */
            "circle-color": data[1],
            "circle-radius": 70,
            "circle-blur": 1,
            /* eslint-enable @typescript-eslint/naming-convention */
          },
          filter:
            index === layersData.length - 1
              ? [">=", "point_count", data[0]]
              : [
                  "all",
                  [">=", "point_count", data[0]],
                  ["<", "point_count", layersData[index + 1][0]],
                ],
        } as CircleLayerSpecification)
    );
  }
}
