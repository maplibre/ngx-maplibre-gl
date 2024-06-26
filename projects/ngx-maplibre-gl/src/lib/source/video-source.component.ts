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
import type { VideoSource, VideoSourceSpecification } from 'maplibre-gl';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';

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
export class VideoSourceComponent implements OnInit, OnDestroy, OnChanges {
  /** Init injection */
  private readonly mapService = inject(MapService);

  /** Init input */
  readonly id = input.required<string>();
  readonly urls = input.required<VideoSourceSpecification['urls']>();
  readonly coordinates =
    input.required<VideoSourceSpecification['coordinates']>();

  /** @hidden */
  readonly type: VideoSourceSpecification['type'] = 'video';

  private readonly sourceAdded = signal(false);
  private sub = new Subscription();

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

    if (changes.urls && !changes.urls.isFirstChange()) {
      this.ngOnDestroy();
      this.ngOnInit();
    } else if (changes.coordinates && !changes.coordinates.isFirstChange()) {
      const source = this.mapService.getSource<VideoSource>(this.id());
      if (source === undefined) {
        return;
      }
      source.setCoordinates(changes.coordinates.currentValue);
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
    const source: VideoSourceSpecification = {
      type: 'video',
      urls: this.urls(),
      coordinates: this.coordinates(),
    };
    this.mapService.addSource(this.id(), source);
    this.sourceAdded.set(true);
  }
}
