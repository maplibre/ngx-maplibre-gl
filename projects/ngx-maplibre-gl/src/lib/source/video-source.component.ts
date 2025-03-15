import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  SimpleChanges,
  inject,
  input,
} from '@angular/core';
import type { FeatureIdentifier, VideoSource, VideoSourceSpecification } from 'maplibre-gl';
import { SourceDirective } from './source.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

/**
 * `mgl-video-source` - a video source
 * @see [video](https://maplibre.org/maplibre-style-spec/sources/#video)
 *
 * @category Source Components
 */
@Component({
  selector: 'mgl-video-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: SourceDirective, inputs: ['id'] }],
})
export class VideoSourceComponent implements OnChanges {
  private readonly sourceDirective = inject(SourceDirective);

  /** Dynamic input */
  readonly urls = input.required<VideoSourceSpecification['urls']>();

  /** Dynamic input */
  readonly coordinates =
    input.required<VideoSourceSpecification['coordinates']>();

  constructor() {
    this.sourceDirective.loadSource$.pipe(
      tap(() => this.addSource()),
      takeUntilDestroyed()
    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.sourceDirective.sourceId()) {
      return;
    }

    if (changes.urls && !changes.urls.isFirstChange()) {
      this.sourceDirective.refresh();
    } else if (changes.coordinates && !changes.coordinates.isFirstChange()) {
      const source = this.sourceDirective.getSource<VideoSource>();
      if (source === undefined) {
        return;
      }
      source.setCoordinates(changes.coordinates.currentValue);
    }
  }

  addSource() {
    const source: VideoSourceSpecification = {
      type: 'video',
      urls: this.urls(),
      coordinates: this.coordinates(),
    };
    this.sourceDirective.addSource(source);
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
