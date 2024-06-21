import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
  input,
  signal,
} from '@angular/core';
import type { RasterDEMSourceSpecification } from 'maplibre-gl';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';

/**
 * `mgl-raster-dem-source` - a raster DEM source
 * @see [raster DEM](https://maplibre.org/maplibre-style-spec/sources/#raster-dem)
 *
 * @category Source Components
 */
@Component({
  selector: 'mgl-raster-dem-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
// RasterDEMSourceSpecification
export class RasterDemSourceComponent implements OnInit, OnDestroy, OnChanges {
  /** Init injection */
  private readonly mapService = inject(MapService);

  /** Init input */
  readonly id = input.required<string>();

  /** Dynamic input */
  readonly url = input<RasterDEMSourceSpecification['url']>();
  readonly tiles = input<RasterDEMSourceSpecification['tiles']>();
  readonly bounds = input<RasterDEMSourceSpecification['bounds']>();
  readonly minzoom = input<RasterDEMSourceSpecification['minzoom']>();
  readonly maxzoom = input<RasterDEMSourceSpecification['maxzoom']>();
  readonly tileSize = input<RasterDEMSourceSpecification['tileSize']>();
  readonly attribution = input<RasterDEMSourceSpecification['attribution']>();
  readonly encoding = input<RasterDEMSourceSpecification['encoding']>();

  /** @hidden */
  readonly type: RasterDEMSourceSpecification['type'] = 'raster-dem';

  private readonly sourceAdded = signal(false);
  private readonly sub = new Subscription();

  ngOnInit() {
    const sub1 = this.mapService.mapLoaded$.subscribe(() => {
      this.init();
      const sub = fromEvent(this.mapService.mapInstance, 'styledata')
        .pipe(filter(() => !this.mapService.mapInstance.getSource(this.id())))
        .subscribe(() => {
          this.init();
        });
      this.sub.add(sub);
    });
    this.sub.add(sub1);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.sourceAdded()) {
      return;
    }
    if (
      (changes.url && !changes.url.isFirstChange()) ||
      (changes.tiles && !changes.tiles.isFirstChange()) ||
      (changes.bounds && !changes.bounds.isFirstChange()) ||
      (changes.minzoom && !changes.minzoom.isFirstChange()) ||
      (changes.maxzoom && !changes.maxzoom.isFirstChange()) ||
      (changes.tileSize && !changes.tileSize.isFirstChange()) ||
      (changes.attribution && !changes.attribution.isFirstChange()) ||
      (changes.encoding && !changes.encoding.isFirstChange())
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if (this.sourceAdded()) {
      this.mapService.removeSource(this.id());
      this.sourceAdded.set(false);
    }
  }

  private init() {
    const source: RasterDEMSourceSpecification = {
      type: this.type,
      url: this.url(),
      tiles: this.tiles(),
      bounds: this.bounds(),
      minzoom: this.minzoom(),
      maxzoom: this.maxzoom(),
      tileSize: this.tileSize(),
      attribution: this.attribution(),
      encoding: this.encoding(),
    };
    this.mapService.addSource(this.id(), source);
    this.sourceAdded.set(true);
  }
}
