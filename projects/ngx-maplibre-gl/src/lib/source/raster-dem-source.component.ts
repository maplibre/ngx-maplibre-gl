import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  SimpleChanges,
  inject,
  input,
} from '@angular/core';
import type { FeatureIdentifier, RasterDEMSourceSpecification } from 'maplibre-gl';
import { tap } from 'rxjs/operators';
import { SourceDirective } from './source.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  hostDirectives: [{ directive: SourceDirective, inputs: ['id'] }],
})
export class RasterDemSourceComponent implements OnChanges {
  /** Init injections */
  private readonly sourceDirective = inject(SourceDirective);

  /** Dynamic input */
  readonly url = input<RasterDEMSourceSpecification['url']>();

  /** Dynamic input */
  readonly tiles = input<RasterDEMSourceSpecification['tiles']>();

  /** Dynamic input */
  readonly bounds = input<RasterDEMSourceSpecification['bounds']>();

  /** Dynamic input */
  readonly minzoom = input<RasterDEMSourceSpecification['minzoom']>();

  /** Dynamic input */
  readonly maxzoom = input<RasterDEMSourceSpecification['maxzoom']>();

  /** Dynamic input */
  readonly tileSize = input<RasterDEMSourceSpecification['tileSize']>();

  /** Dynamic input */
  readonly attribution = input<RasterDEMSourceSpecification['attribution']>();

  /** Dynamic input */
  readonly encoding = input<RasterDEMSourceSpecification['encoding']>();

  constructor() {
    this.sourceDirective.loadSource$
      .pipe(
        tap(() =>
          this.sourceDirective.addSource(this.getRasterDEMSourceSpecification())
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
      (changes.attribution && !changes.attribution.isFirstChange()) ||
      (changes.encoding && !changes.encoding.isFirstChange())
    ) {
      this.sourceDirective.refresh();
    }
  }

  getRasterDEMSourceSpecification(): RasterDEMSourceSpecification {
    return {
      type: 'raster-dem',
      url: this.url(),
      tiles: this.tiles(),
      bounds: this.bounds(),
      minzoom: this.minzoom(),
      maxzoom: this.maxzoom(),
      tileSize: this.tileSize(),
      attribution: this.attribution(),
      encoding: this.encoding(),
    };
  }

  /**
   * Sets the `state` of a feature.
   * 
   * @param feature Feature identifier. `source` may be omitted, will use this source id.
   * @param state A set of key-value pairs. The values should be valid JSON types.
   * 
   * @see [maplibre-gl-js' Docs](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#setfeaturestate)
   */
  public setFeatureState(feature: Partial<FeatureIdentifier>, state: any) {
    this.sourceDirective.setFeatureState(feature, state);
  }

  /**
   * Removes the `state` of a feature, setting it back to the default behavior.
   * 
   * @param target Feature identifier. `source` may be omitted, will use this source id.
   * @param key The key in the feature state to reset.
   * 
   * @see [maplibre-gl-js' Docs](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#removeFeatureState)
   */
  removeFeatureState(target: Partial<FeatureIdentifier>, key?: string) {
    this.sourceDirective.removeFeatureState(target, key);
  }

  /**
   * Gets the `state` of a feature.
   * 
   * @param feature Feature identifier. `source` may be omitted, will use this source id.
   * @returns The state of the feature: a set of key-value pairs that was assigned to the feature at runtime.
   * 
   * @see [maplibre-gl-js' Docs](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#getFeatureState)
   */
  getFeatureState(feature: Partial<FeatureIdentifier>): any {
    return this.sourceDirective.getFeatureState(feature);
  }
}
