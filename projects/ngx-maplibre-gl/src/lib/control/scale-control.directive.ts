import {
  Directive,
  OnChanges,
  SimpleChanges,
  afterNextRender,
  inject,
  input,
} from '@angular/core';
import { ScaleControl,  type ScaleControlOptions } from 'maplibre-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';

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
  standalone: true,
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
  readonly unit = input<'imperial' | 'metric' | 'nautical'>();

  constructor() {
    afterNextRender(() => {
      this.mapService.mapCreated$.subscribe(() => {
        if (this.controlComponent.control) {
          throw new Error('Another control is already set for this control');
        }
        const options: ScaleControlOptions = {};
        const maxWidth = this.maxWidth();
        if (maxWidth !== undefined) {
          options.maxWidth = maxWidth;
        }
        const unit = this.unit();

        if (unit !== undefined) {
          options.unit = unit;
        }
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
