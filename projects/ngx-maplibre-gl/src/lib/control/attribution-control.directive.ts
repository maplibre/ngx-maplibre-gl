import { Directive, afterNextRender, inject, input } from '@angular/core';
import {
  AttributionControl,
  type AttributionControlOptions,
} from 'maplibre-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import { keepAvailableObjectValues } from '../shared/utils';

/**
 * `mglAttribution` - an attribution control directive
 *
 * @category Directives
 *
 * @see [Add custom attribution](https://maplibre.org/ngx-maplibre-gl/demo/custom-attribution)
 * @see [AttributionControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/AttributionControl)
 */
@Directive({
  selector: '[mglAttribution]',
  standalone: true,
})
export class AttributionControlDirective {
  /* Init injection */
  private readonly mapService = inject(MapService);
  private readonly controlComponent = inject<
    ControlComponent<AttributionControl>
  >(ControlComponent, { host: true });

  /** Init input */
  readonly compact = input<boolean>();
  readonly customAttribution = input<string | string[]>();

  constructor() {
    afterNextRender(() => {
      this.mapService.mapCreated$.subscribe(() => {
        if (this.controlComponent.control) {
          throw new Error('Another control is already set for this control');
        }

        const options = keepAvailableObjectValues<AttributionControlOptions>({
          compact: this.compact(),
          customAttribution: this.customAttribution(),
        });

        this.controlComponent.control = new AttributionControl(options);
        this.mapService.addControl(
          this.controlComponent.control,
          this.controlComponent.position()
        );
      });
    });
  }
}
