import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
  input,
} from '@angular/core';
import type { CanvasSource, CanvasSourceSpecification } from 'maplibre-gl';
import { fromEvent } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * `mgl-canvas-source` - a canvas source component
 * @see [canvas](https://maplibre.org/maplibre-style-spec/sources/#canvas)
 *
 * @category Source Components
 */
@Component({
  selector: 'mgl-canvas-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CanvasSourceComponent implements OnInit, OnChanges {
  /** Init injection */
  private readonly mapService = inject(MapService);
  private readonly destroyRef = inject(DestroyRef);

  /**  Init input */
  readonly id = input.required<string>();

  readonly coordinates =
    input.required<CanvasSourceSpecification['coordinates']>();
  readonly canvas = input.required<CanvasSourceSpecification['canvas']>();
  readonly animate = input<CanvasSourceSpecification['animate']>();

  private sourceAdded = false;

  constructor() {
    this.destroyRef.onDestroy(() => this.removeSource());
  }

  ngOnInit() {
    this.mapService.mapLoaded$
      .pipe(
        tap(() => this.init()),
        switchMap(() =>
          fromEvent(this.mapService.mapInstance, 'styledata').pipe(
            filter(() => !this.mapService.mapInstance.getSource(this.id())),
            tap(() => this.init())
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.sourceAdded) {
      return;
    }
    if (
      (changes.canvas && !changes.canvas.isFirstChange()) ||
      (changes.animate && !changes.animate.isFirstChange())
    ) {
      this.removeSource();
      this.ngOnInit();
    } else if (changes.coordinates && !changes.coordinates.isFirstChange()) {
      const source = this.mapService.getSource<CanvasSource>(this.id());
      if (source === undefined) {
        return;
      }
      source.setCoordinates(changes.coordinates.currentValue);
    }
  }

  removeSource() {
    if (this.sourceAdded) {
      this.mapService.removeSource(this.id());
      this.sourceAdded = false;
    }
  }

  private init() {
    const source: CanvasSourceSpecification = {
      type: 'canvas',
      coordinates: this.coordinates(),
      canvas: this.canvas(),
      animate: this.animate(),
    };
    this.mapService.addSource(this.id(), source as any);
    this.sourceAdded = true;
  }
}
