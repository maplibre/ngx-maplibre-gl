import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  SimpleChanges,
  inject,
  input,
} from '@angular/core';
import type { VideoSource, VideoSourceSpecification } from 'maplibre-gl';
import { SourceDirective } from './source.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { Source } from './source';

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
export class VideoSourceComponent extends Source
  implements OnChanges
{
  protected readonly sourceDirective = inject(SourceDirective);

  /** Dynamic input */
  readonly urls = input.required<VideoSourceSpecification['urls']>();

  /** Dynamic input */
  readonly coordinates =
    input.required<VideoSourceSpecification['coordinates']>();

  constructor() {
    super();
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
}
