import {
  Component,
  OnChanges,
  SimpleChanges,
  viewChild,
  input,
  signal,
  inject,
} from '@angular/core';
import {
  MatPaginator,
  PageEvent,
  MatPaginatorModule,
} from '@angular/material/paginator';
import {
  MapComponent,
  GeoJSONSourceComponent,
  PopupComponent,
  MarkersForClustersComponent,
  PointDirective,
  ClusterPointDirective,
} from '@maplibre/ngx-maplibre-gl';
import { MatListModule } from '@angular/material/list';
import { HttpClient } from '@angular/common/http';
import { interval, map, scan, shareReplay, startWith, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'showcase-cluster-popup',
  template: `
    <mat-list>
      @for (leaf of leaves(); track leaf) {
      <mat-list-item>
        {{ leaf.properties?.['Primary ID'] }}
      </mat-list-item>
      }
    </mat-list>
    <mat-paginator
      [length]="selectedCluster().properties?.point_count"
      [pageSize]="5"
      (page)="changePage($event)"
    />
  `,
  imports: [MatListModule, MatPaginatorModule],
})
export class ClusterPopupComponent implements OnChanges {
  readonly selectedCluster = input.required<{
    geometry: GeoJSON.Point;
    properties: any;
  }>();

  readonly clusterComponent = input.required<GeoJSONSourceComponent>();

  readonly paginator = viewChild.required(MatPaginator);

  readonly leaves = signal<GeoJSON.Feature<GeoJSON.Geometry>[]>([]);

  ngOnChanges(changes: SimpleChanges) {
    this.changePage();
    if (changes.selectedCluster && !changes.selectedCluster.isFirstChange()) {
      this.paginator().firstPage();
    }
  }

  async changePage(pageEvent?: PageEvent) {
    let offset = 0;
    if (pageEvent) {
      offset = pageEvent.pageIndex * 5;
    }

    const leaves = await this.clusterComponent().getClusterLeaves(
      this.selectedCluster().properties.cluster_id,
      5,
      offset
    );

    this.leaves.set(leaves);
  }
}

/**
 * Remember: mgl-layer are way faster than html markers
 * Html markers are fine if you don't have lots of points
 * Try to draw your point with a mgl-layer before using html markers
 * For a compromise, look at cluster-html example, which use only html markers for cluster points
 */
@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [mapStyle]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[3]"
      [center]="[-103.59179687498357, 40.66995747013945]"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      @if (earthquakes(); as earthquakesValue) {
      <mgl-geojson-source
        #clusterComponent
        id="earthquakes"
        [data]="earthquakesValue"
        [cluster]="true"
        [clusterRadius]="50"
        [clusterMaxZoom]="14"
      />
      <mgl-markers-for-clusters source="earthquakes">
        <ng-template mglPoint let-feature>
          <div class="marker" [title]="feature.properties['Secondary ID']">
            {{ feature.properties["Primary ID"] }}
          </div>
        </ng-template>
        <ng-template mglClusterPoint let-feature>
          <div class="marker-cluster" (click)="selectCluster($event, feature)">
            {{ feature.properties?.point_count }}
          </div>
        </ng-template>
      </mgl-markers-for-clusters>
      @if (selectedCluster(); as selectedClusterValue) {
      <mgl-popup [feature]="selectedClusterValue">
        <showcase-cluster-popup
          [clusterComponent]="clusterComponent"
          [selectedCluster]="selectedClusterValue"
        ></showcase-cluster-popup>
      </mgl-popup>
      } }
    </mgl-map>
  `,
  styleUrls: ['./examples.css', './ngx-cluster-html.component.css'],
  imports: [
    MapComponent,
    GeoJSONSourceComponent,
    MarkersForClustersComponent,
    PointDirective,
    ClusterPointDirective,
    PopupComponent,
    ClusterPopupComponent,
  ],
})
export class NgxClusterHtmlComponent {
  private readonly http = inject(HttpClient);

  private readonly earthquakes$ = this.http
    .get<GeoJSON.FeatureCollection>('assets/data/earthquakes.geo.json')
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  private readonly animated$ = this.earthquakes$.pipe(
    switchMap((fc) =>
      interval(500).pipe(
        startWith(-1),
        scan((count) => Math.max(0, count - 1), fc.features.length),
        map((count) => ({
          ...fc,
          features: fc.features.slice(0, count)
        }))
      )
    )
  );

  readonly earthquakes = toSignal(this.animated$, {
    initialValue: null
  });

  readonly selectedCluster = signal<{
    geometry: GeoJSON.Point;
    properties: any;
  } | null>(null);


  selectCluster(event: MouseEvent, feature: any) {
    event.stopPropagation(); // This is needed, otherwise the popup will close immediately
    // Change the ref, to trigger mgl-popup onChanges (when the user click on the same cluster)
    this.selectedCluster.set({
      geometry: feature.geometry,
      properties: feature.properties,
    });
  }
}
