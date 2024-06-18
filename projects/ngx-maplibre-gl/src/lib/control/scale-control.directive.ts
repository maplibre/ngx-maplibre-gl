import {
  AfterContentInit,
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ScaleControl, ScaleControlOptions } from 'maplibre-gl';
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
export class ScaleControlDirective implements AfterContentInit, OnChanges {
  /* Init injection */
  private readonly mapService = inject(MapService);
  private readonly controlComponent = inject<ControlComponent<ScaleControl>>(
    ControlComponent,
    { host: true }
  );

  /* Init inputs */
  @Input() maxWidth?: number;

  /* Dynamic inputs */
  @Input() unit?: 'imperial' | 'metric' | 'nautical';

  ngOnChanges(changes: SimpleChanges) {
    if (changes.unit && !changes.unit.isFirstChange()) {
      (this.controlComponent.control as ScaleControl).setUnit(
        changes.unit.currentValue
      );
    }
  }

  ngAfterContentInit() {
    this.mapService.mapCreated$.subscribe(() => {
      if (this.controlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      const options: ScaleControlOptions = {};
      if (this.maxWidth !== undefined) {
        options.maxWidth = this.maxWidth;
      }
      if (this.unit !== undefined) {
        options.unit = this.unit;
      }
      this.controlComponent.control = new ScaleControl(options);
      this.mapService.addControl(
        this.controlComponent.control,
        this.controlComponent.position
      );
    });
  }
}
