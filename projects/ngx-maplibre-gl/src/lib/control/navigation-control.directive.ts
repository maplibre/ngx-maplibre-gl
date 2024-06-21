import { Directive, afterNextRender, inject, input } from '@angular/core';
import { NavigationControl } from 'maplibre-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';

/**
 * `mglNavigation` - a navigation control directive
 *
 * @category Directives
 *
 * @see [Navigation](https://maplibre.org/ngx-maplibre-gl/demo/navigation)
 * @see [NavigationControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/NavigationControl)
 */
@Directive({
  selector: '[mglNavigation]',
  standalone: true,
})
export class NavigationControlDirective {
  /* Init injection */
  private readonly mapService = inject(MapService);
  private readonly controlComponent = inject<
    ControlComponent<NavigationControl>
  >(ControlComponent, { host: true });

  /* Init inputs */
  readonly showCompass = input<boolean>();
  readonly showZoom = input<boolean>();
  readonly visualizePitch = input<boolean>();

  constructor() {
    afterNextRender(() => {
      this.mapService.mapCreated$.subscribe(() => {
        if (this.controlComponent.control) {
          throw new Error('Another control is already set for this control');
        }

        const options: {
          showCompass?: boolean;
          showZoom?: boolean;
          visualizePitch?: boolean;
        } = {};
        const showCompass = this.showCompass();
        if (showCompass !== undefined) {
          options.showCompass = showCompass;
        }
        const showZoom = this.showCompass();
        if (showZoom !== undefined) {
          options.showZoom = showZoom;
        }

        const visualizePitch = this.visualizePitch();
        if (this.visualizePitch !== undefined) {
          options.visualizePitch = visualizePitch;
        }

        this.controlComponent.control = new NavigationControl(options);
        this.mapService.addControl(
          this.controlComponent.control,
          this.controlComponent.position()
        );
      });
    });
  }
}
