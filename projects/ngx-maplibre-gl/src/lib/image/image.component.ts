import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import type { MapImageData, MapImageOptions } from '../map/map.types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * `mgl-image` - an image component
 * @see [addImage](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#addimage)
 *
 * @category Components
 *
 * @example
 * ```html
 * ...
 * <mgl-map
 *   ...
 * >
 *    <mgl-image
 *      id="image"
 *      url="https://..."
 *      (imageLoaded)="imageLoaded = true"
 *    >
 *    ...
 *    <mgl-image
 *      id="image2"
 *      [data]="{
 *        width: 64,
 *        height: 64,
 *        data: imageData
 *      }"
 *    >
 * </mgl-map>
 * ...
 * imageData: Uint8Array;
 * ```
 */
@Component({
  selector: 'mgl-image',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent implements OnInit, OnDestroy, OnChanges {
  /** Init injection */
  private readonly mapService = inject(MapService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);

  /** Init input */
  readonly id = input.required<string>();

  /** Dynamic input */
  readonly data = input<MapImageData>();
  readonly options = input<MapImageOptions>();
  readonly url = input<string>();

  readonly imageError = output<{
    status: number;
  }>();

  readonly imageLoaded = output<void>();

  private isAdded = signal(false);
  private isAdding = signal(false);

  ngOnInit() {
    this.mapService.mapLoaded$
      .pipe(
        switchMap(() =>
          fromEvent(this.mapService.mapInstance, 'styledata').pipe(
            startWith(undefined),
            filter(
              () =>
                !this.isAdding() &&
                !this.mapService.mapInstance.hasImage(this.id())
            )
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.init());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes.data && !changes.data.isFirstChange()) ||
      (changes.options && !changes.options.isFirstChange()) ||
      (changes.url && !changes.url.isFirstChange())
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    }
  }

  ngOnDestroy() {
    if (this.isAdded()) {
      this.mapService.removeImage(this.id());
    }
  }

  private async init() {
    this.isAdding.set(true);
    const data = this.data();
    const url = this.url();
    if (data) {
      this.mapService.addImage(this.id(), data, this.options());
      this.isAdded.set(true);
      this.isAdding.set(false);
    } else if (url) {
      try {
        await this.mapService.loadAndAddImage(this.id(), url, this.options());
        this.isAdded.set(true);
        this.isAdding.set(false);
        this.zone.run(() => {
          this.imageLoaded.emit();
        });
      } catch (error) {
        this.zone.run(() => {
          this.imageError.emit(error as any);
        });
      }
    }
  }
}
