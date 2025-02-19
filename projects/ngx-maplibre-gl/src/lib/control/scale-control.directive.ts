import {
  Directive,
  OnChanges,
  SimpleChanges,
  afterNextRender,
  inject,
  input,
} from '@angular/core';
import { ScaleControl, type Unit, type ScaleControlOptions } from 'maplibre-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import { keepAvailableObjectValues } from '../shared/utils/functions/object.fn';

/**
 * `mglScale` - a scale control directive
 *
 * @category Directives
 *
 * @see [Scale](https://maplibre.org/ngx-maplibre-gl/demo/ngx-scale-control)
 * @see [ScaleControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/ScaleControl)
 */
@Directive({
  selector: '[mglScale]',
})
export class ScaleControlDirective implements OnChanges {
  /* Init injection */
  private readonly mapService = inject(MapService);
  private readonly controlComponent = inject<ControlComponent<ScaleControl>>(
    ControlComponent,
    { host: true }
  );

  /* Init inputs */
  readonly maxWidth = input<number>();

  /* Dynamic inputs */
  readonly unit = input<Unit>();

  constructor() {
    afterNextRender(() => {
      this.mapService.mapCreated$.subscribe(() => {
        if (this.controlComponent.control) {
          throw new Error('Another control is already set for this control');
        }
        const options = keepAvailableObjectValues<ScaleControlOptions>({
          maxWidth: this.maxWidth(),
          unit: this.unit(),
        });

        this.controlComponent.control = new ScaleControl(options);
        this.mapService.addControl(
          this.controlComponent.control,
          this.controlComponent.position()
        );
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.unit && !changes.unit.isFirstChange()) {
      (this.controlComponent.control as ScaleControl).setUnit(
        changes.unit.currentValue
      );
    }
  }
}
