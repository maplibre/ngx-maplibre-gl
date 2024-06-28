import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  SimpleChanges,
  inject,
  input,
} from '@angular/core';
import type { RasterSourceSpecification } from 'maplibre-gl';
import { SourceDirective } from './source.directive';
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
  hostDirectives: [{ directive: SourceDirective, inputs: ['id'] }],
  standalone: true,
})
export class RasterSourceComponent implements OnChanges {
  /** Init injections */
  private readonly sourceDirective = inject(SourceDirective);

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
    this.sourceDirective.loadSource$
      .pipe(
        tap(() =>
          this.sourceDirective.addSource(this.getRasterSourceSpecification())
        ),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.sourceDirective.sourceId()) {
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
      this.sourceDirective.refresh();
    }
  }

  getRasterSourceSpecification(): RasterSourceSpecification {
    return {
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
  }
}
