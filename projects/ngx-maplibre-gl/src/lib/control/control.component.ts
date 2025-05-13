import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  inject,
  input,
  viewChild,
} from '@angular/core';
import type { ControlPosition, IControl } from 'maplibre-gl';
import { MapService } from '../map/map.service';

export class CustomControl implements IControl {
  constructor(private container: HTMLElement) {}

  /** @inheritdoc */
  onAdd() {
    return this.container;
  }

  /** @inheritdoc */
  onRemove() {
    return this.container.parentNode!.removeChild(this.container);
  }

  /** @inheritdoc */
  getDefaultPosition(): ControlPosition {
    return 'top-right';
  }
}

/**
 * `mgl-control` - a custom control component
 * @see [Controls](https://maplibre.org/maplibre-gl-js/docs/API/interfaces/IControl/)
 *
 * @category Components
 *
 * @example
 * ```html
 * ...
 * <mgl-map ...>
 *   <mgl-control> Hello </mgl-control>
 *   ...
 *   <mgl-control mglNavigation></mgl-control>
 *   ...
 *   <mgl-control mglScale unit="imperial" position="top-right"></mgl-control>
 *   ...
 *   <mgl-control
 *     mglTerrain
 *     source="rasterDemSource"
 *     exaggeration="3.1"
 *   ></mgl-control>
 * </mgl-map>
 * ```
 */
@Component({
  selector: 'mgl-control',
  template: `
    <div class="maplibregl-ctrl" #content>
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlComponent<T extends IControl> implements OnDestroy {
  /** Init injection */
  private readonly mapService = inject(MapService);

  /** Init input */
  readonly position = input<ControlPosition>();

  /** @hidden */
  readonly content = viewChild.required<ElementRef<HTMLDivElement>>('content');

  control: T | CustomControl;

  constructor() {
    afterNextRender(() => {
      if (this.content().nativeElement.childNodes.length) {
        this.control = new CustomControl(this.content().nativeElement);
        this.mapService.mapCreated$.subscribe(() => {
          this.mapService.addControl(this.control, this.position());
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.mapService?.mapInstance?.hasControl(this.control)) {
      this.mapService.removeControl(this.control);
    }
  }
}
