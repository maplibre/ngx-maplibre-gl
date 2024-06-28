import { Directive, afterNextRender, inject, input } from '@angular/core';
import { FullscreenControl } from 'maplibre-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';

/**
 * `mglFullscreen` - a fullscreen control directive
 *
 * @category Directives
 */
@Directive({
  selector: '[mglFullscreen]',
  standalone: true,
  host: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '(window:webkitfullscreenchange)': 'onFullscreen()',
  },
})
export class FullscreenControlDirective {
  /* Init injection */
  private readonly mapService = inject(MapService);
  private readonly controlComponent = inject<
    ControlComponent<FullscreenControl>
  >(ControlComponent, { host: true });

  /* Init inputs */
  readonly container = input<HTMLElement>();

  constructor() {
    afterNextRender(() => {
      this.mapService.mapCreated$.subscribe(() => {
        if (this.controlComponent.control) {
          throw new Error('Another control is already set for this control');
        }
        this.controlComponent.control = new FullscreenControl({
          container: this.container(),
        });
        this.mapService.addControl(
          this.controlComponent.control,
          this.controlComponent.position()
        );
      });
    });
  }

  onFullscreen() {
    this.mapService.mapInstance.resize();
  }
}
