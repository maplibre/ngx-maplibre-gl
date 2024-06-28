import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  SimpleChanges,
  input,
} from '@angular/core';
import type { CanvasSource, CanvasSourceSpecification } from 'maplibre-gl';
import { BaseSourceDirective } from './base-source.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

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
export class CanvasSourceComponent
  extends BaseSourceDirective
  implements OnChanges
{
  /** Dynamic input */
  readonly coordinates =
    input.required<CanvasSourceSpecification['coordinates']>();

  /** Dynamic input */
  readonly canvas = input.required<CanvasSourceSpecification['canvas']>();

  /** Dynamic input */
  readonly animate = input<CanvasSourceSpecification['animate']>();

  constructor() {
    super();

    this.loadSource$
      .pipe(
        tap(() => this.addSource()),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.sourceId()) {
      return;
    }
    if (
      (changes.canvas && !changes.canvas.isFirstChange()) ||
      (changes.animate && !changes.animate.isFirstChange())
    ) {
      this.refresh();
    } else if (changes.coordinates && !changes.coordinates.isFirstChange()) {
      const source = this.mapService.getSource<CanvasSource>(this.id());
      if (source === undefined) {
        return;
      }
      source.setCoordinates(changes.coordinates.currentValue);
    }
  }

  addSource() {
    const source: CanvasSourceSpecification = {
      type: 'canvas',
      coordinates: this.coordinates(),
      canvas: this.canvas(),
      animate: this.animate(),
    };
    this.mapService.addSource(this.id(), source as any);
    this.sourceId.set(this.id());
  }
}
