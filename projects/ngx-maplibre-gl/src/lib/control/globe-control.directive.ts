import { Directive, afterNextRender, inject } from '@angular/core';
import { GlobeControl } from 'maplibre-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';

/**
 * `mglGlobe` - a globe control directive
 *
 * @category Directives
 *
 * @see [Globe](https://maplibre.org/ngx-maplibre-gl/demo/globe)
 * @see [GlobeControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/GlobeControl)
 */
@Directive({
  selector: '[mglGlobe]',
})
export class GlobeControlDirective {

  private readonly mapService = inject(MapService);
  private readonly controlComponent = inject<ControlComponent<GlobeControl>>(
    ControlComponent,
    { host: true }
  );

  constructor() {
    afterNextRender(() => {
      this.mapService.mapCreated$.subscribe(() => {
        if (this.controlComponent.control) {
          throw new Error('Another control is already set for this control');
        }

        this.controlComponent.control = new GlobeControl();

        this.mapService.addControl(
          this.controlComponent.control,
          this.controlComponent.position()
        );
      });
    });
  }
}
