import { AfterContentInit, Directive, Input, inject } from '@angular/core';
import { AttributionControl } from 'maplibre-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';

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
export class AttributionControlDirective implements AfterContentInit {
  /* Init injection */
  private readonly mapService = inject(MapService);
  private readonly controlComponent = inject<
    ControlComponent<AttributionControl>
  >(ControlComponent, { host: true });

  /** Init input */
  @Input() compact?: boolean;
  /** Init input */
  @Input() customAttribution?: string | string[];

  ngAfterContentInit() {
    this.mapService.mapCreated$.subscribe(() => {
      if (this.controlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      const options: {
        compact?: boolean;
        customAttribution?: string | string[];
      } = {};
      if (this.compact !== undefined) {
        options.compact = this.compact;
      }
      if (this.customAttribution !== undefined) {
        options.customAttribution = this.customAttribution;
      }
      this.controlComponent.control = new AttributionControl(options);
      this.mapService.addControl(
        this.controlComponent.control,
        this.controlComponent.position
      );
    });
  }
}
