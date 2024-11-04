import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  SimpleChanges,
  inject,
  input,
} from '@angular/core';
import type { CanvasSource, CanvasSourceSpecification } from 'maplibre-gl';
import { SourceDirective } from './source.directive';
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
  hostDirectives: [{ directive: SourceDirective, inputs: ['id'] }],
  standalone: true,
})
export class CanvasSourceComponent implements OnChanges {
  /** Init injections */
  private readonly sourceDirective = inject(SourceDirective);

  /** Dynamic input */
  readonly coordinates =
    input.required<CanvasSourceSpecification['coordinates']>();

  /** Dynamic input */
  readonly canvas = input.required<CanvasSourceSpecification['canvas']>();

  /** Dynamic input */
  readonly animate = input<CanvasSourceSpecification['animate']>();

  constructor() {
    this.sourceDirective.loadSource$
      .pipe(
        tap(() =>
          this.sourceDirective.addSource(this.getCanvasSourceSpecification() as any)
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
      (changes.canvas && !changes.canvas.isFirstChange()) ||
      (changes.animate && !changes.animate.isFirstChange())
    ) {
      this.sourceDirective.refresh();
    } else if (changes.coordinates && !changes.coordinates.isFirstChange()) {
      const source = this.sourceDirective.getSource<CanvasSource>();
      if (source === undefined) {
        return;
      }
      source.setCoordinates(changes.coordinates.currentValue);
    }
  }

  getCanvasSourceSpecification(): CanvasSourceSpecification {
    return {
      type: 'canvas',
      coordinates: this.coordinates(),
      canvas: this.canvas(),
      animate: this.animate(),
    };
  }
}
