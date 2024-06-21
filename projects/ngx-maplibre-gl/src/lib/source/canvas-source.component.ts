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
import type { CanvasSource, CanvasSourceSpecification } from 'maplibre-gl';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';

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
// CanvasSourceSpecification
export class CanvasSourceComponent implements OnInit, OnDestroy, OnChanges {
  /** Init injection */
  private readonly mapService = inject(MapService);

  /**  Init input */
  readonly id = input.required<string>();

  /** Dynamic input */
  readonly coordinates =
    input.required<CanvasSourceSpecification['coordinates']>();
  readonly canvas = input.required<CanvasSourceSpecification['canvas']>();
  readonly animate = input<CanvasSourceSpecification['animate']>();

  readonly type: CanvasSourceSpecification['type'] = 'canvas';
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
    if (
      (changes.canvas && !changes.canvas.isFirstChange()) ||
      (changes.animate && !changes.animate.isFirstChange())
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    } else if (changes.coordinates && !changes.coordinates.isFirstChange()) {
      const source = this.mapService.getSource<CanvasSource>(this.id());
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
    const source: CanvasSourceSpecification = {
      type: 'canvas',
      coordinates: this.coordinates(),
      canvas: this.canvas(),
      animate: this.animate(),
    };
    this.mapService.addSource(this.id(), source as any);
    this.sourceAdded.set(true);
  }
}
