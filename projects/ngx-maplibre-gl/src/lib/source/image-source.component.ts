import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
  input,
  signal,
} from '@angular/core';
import type { ImageSourceSpecification, ImageSource } from 'maplibre-gl';
import { MapService } from '../map/map.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * `mgl-image-source` - an image source component
 * @see [image](https://maplibre.org/maplibre-style-spec/sources/#image)
 *
 * @category Source Components
 */
@Component({
  selector: 'mgl-image-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ImageSourceComponent implements OnInit, OnDestroy, OnChanges {
  /** Init injection */
  private readonly destroyRef = inject(DestroyRef);
  private readonly mapService = inject(MapService);

  /** Init inputs */
  readonly id = input.required<string>();

  /** Dynamic inputs */
  readonly url = input.required<ImageSourceSpecification['url']>();
  readonly coordinates =
    input.required<ImageSourceSpecification['coordinates']>();

  readonly type: ImageSourceSpecification['type'] = 'image';

  private readonly sourceId = signal<string | null>(null);

  ngOnInit() {
    this.mapService.mapLoaded$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.addSource());
  }

  ngOnChanges(changes: SimpleChanges) {
    const sourceId = this.sourceId();
    if (sourceId === null) {
      return;
    }
    const source = this.mapService.getSource<ImageSource>(sourceId);
    if (source === undefined) {
      return;
    }
    source.updateImage({
      url: changes.url === undefined ? (undefined as any) : this.url(),
      coordinates:
        changes.coordinates === undefined ? undefined : this.coordinates(),
    });
  }

  ngOnDestroy() {
    const sourceId = this.sourceId();
    if (sourceId !== null) {
      this.mapService.removeSource(sourceId);
      this.sourceId.set(null);
    }
  }

  private addSource() {
    const imageSource: ImageSourceSpecification = {
      type: 'image',
      url: this.url(),
      coordinates: this.coordinates(),
    };
    this.mapService.addSource(this.id(), imageSource);
    this.sourceId.set(this.id());
  }
}
