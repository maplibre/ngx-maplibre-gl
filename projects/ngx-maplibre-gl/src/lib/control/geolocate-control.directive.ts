import {
  Directive,
  afterNextRender,
  inject,
  input,
  output,
} from '@angular/core';
import { type FitBoundsOptions, GeolocateControl } from 'maplibre-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import type { Position } from '../map/map.types';

/**
 * `mglGeolocate` - a geolocate control directive
 *
 * @category Directives
 *
 * @see [Locate user](https://maplibre.org/ngx-maplibre-gl/demo/locate-user)
 * @see [GeolocateControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/GeolocateControl)
 */
@Directive({
  selector: '[mglGeolocate]',
  standalone: true,
})
export class GeolocateControlDirective {
  /* Init injection */
  private readonly mapService = inject(MapService);
  private readonly controlComponent = inject<
    ControlComponent<GeolocateControl>
  >(ControlComponent, { host: true });

  /* Init inputs */
  readonly positionOptions = input<PositionOptions>();
  readonly fitBoundsOptions = input<FitBoundsOptions>();
  readonly trackUserLocation = input<boolean>();
  readonly showUserLocation = input<boolean>();

  readonly geolocate = output<Position>();

  constructor() {
    afterNextRender(() => {
      this.mapService.mapCreated$.subscribe(() => {
        if (this.controlComponent.control) {
          throw new Error('Another control is already set for this control');
        }
        const options = {
          positionOptions: this.positionOptions(),
          fitBoundsOptions: this.fitBoundsOptions(),
          trackUserLocation: this.trackUserLocation(),
          showUserLocation: this.showUserLocation(),
        };

        Object.keys(options).forEach((key: string) => {
          const tkey = <keyof typeof options>key;
          if (options[tkey] === undefined) {
            delete options[tkey];
          }
        });
        this.controlComponent.control = new GeolocateControl(options);
        this.controlComponent.control.on('geolocate', (data: Position) => {
          this.geolocate.emit(data);
        });
        this.mapService.addControl(
          this.controlComponent.control,
          this.controlComponent.position()
        );
      });
    });
  }
}
