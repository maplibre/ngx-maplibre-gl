import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  SimpleChanges,
  input,
} from '@angular/core';
import type { VideoSource, VideoSourceSpecification } from 'maplibre-gl';
import { BaseSourceDirective } from './base-source.directive';
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
  standalone: true,
})
export class VideoSourceComponent
  extends BaseSourceDirective
  implements OnChanges
{
  /** Dynamic input */
  readonly urls = input.required<VideoSourceSpecification['urls']>();

  /** Dynamic input */
  readonly coordinates =
    input.required<VideoSourceSpecification['coordinates']>();

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

    if (changes.urls && !changes.urls.isFirstChange()) {
      this.refresh();
    } else if (changes.coordinates && !changes.coordinates.isFirstChange()) {
      const source = this.mapService.getSource<VideoSource>(this.id());
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
    this.mapService.addSource(this.id(), source);
    this.sourceId.set(this.id());
  }
}
