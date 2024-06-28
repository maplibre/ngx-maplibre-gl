import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  SimpleChanges,
  input,
} from '@angular/core';
import type { RasterSourceSpecification } from 'maplibre-gl';
import { BaseSourceDirective } from './base-source.directive';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
export class RasterSourceComponent
  extends BaseSourceDirective
  implements OnChanges
{
  /** Dynamic input */
  readonly url = input<RasterSourceSpecification['url']>();

  /** Dynamic input */
  readonly tiles = input<RasterSourceSpecification['tiles']>();

  /** Dynamic input */
  readonly bounds = input<RasterSourceSpecification['bounds']>();

  /** Dynamic input */
  readonly scheme = input<RasterSourceSpecification['scheme']>();

  /** Dynamic input */
  readonly minzoom = input<RasterSourceSpecification['minzoom']>();

  /** Dynamic input */
  readonly maxzoom = input<RasterSourceSpecification['maxzoom']>();

  /** Dynamic input */
  readonly tileSize = input<RasterSourceSpecification['tileSize']>();

  /** Dynamic input */
  readonly attribution = input<RasterSourceSpecification['attribution']>();

  constructor() {
    super();

    this.loadSource$.pipe(
      tap(() => this.addSource()),
      takeUntilDestroyed()
    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.sourceId()) {
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
      this.refresh();
    }
  }

  addSource() {
    const source: RasterSourceSpecification = {
      type: 'raster',
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
    this.sourceId.set(this.id());
  }
}
