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
import type { RasterSourceSpecification } from 'maplibre-gl';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';

/**
 * `mgl-raster-source` - a raster source component
 * @see [raster](https://maplibre.org/maplibre-style-spec/sources/#raster)
 *
 * @category Source Components
 */
@Component({
  selector: 'mgl-raster-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
// RasterSourceSpecification
export class RasterSourceComponent implements OnInit, OnDestroy, OnChanges {
  /** Init injection */
  private readonly mapService = inject(MapService);

  /** Init input */
  readonly id = input.required<string>();

  /** Dynamic input */
  readonly url = input<RasterSourceSpecification['url']>();
  readonly tiles = input<RasterSourceSpecification['tiles']>();
  readonly bounds = input<RasterSourceSpecification['bounds']>();
  readonly scheme = input<RasterSourceSpecification['scheme']>();
  readonly minzoom = input<RasterSourceSpecification['minzoom']>();
  readonly maxzoom = input<RasterSourceSpecification['maxzoom']>();
  readonly tileSize = input<RasterSourceSpecification['tileSize']>();
  readonly attribution = input<RasterSourceSpecification['attribution']>();

  /** @hidden */
  readonly type: RasterSourceSpecification['type'] = 'raster';

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
      (changes.scheme && !changes.scheme.isFirstChange()) ||
      (changes.attribution && !changes.attribution.isFirstChange())
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
    const source: RasterSourceSpecification = {
      type: this.type,
      url: this.url(),
      tiles: this.tiles(),
      bounds: this.bounds(),
      minzoom: this.minzoom(),
      maxzoom: this.maxzoom(),
      tileSize: this.tileSize(),
      scheme: this.scheme(),
      attribution: this.attribution(),
    };
    this.mapService.addSource(this.id(), source);
    this.sourceAdded.set(true);
  }
}
