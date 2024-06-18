import {
  AfterContentInit,
  Directive,
  Input,
  inject,
} from '@angular/core';
import { TerrainControl, TerrainSpecification } from 'maplibre-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';

/**
 * `mglTerrain` - a terrain control directive
 *
 * @category Directives
 *
 * @see [Terrain](https://maplibre.org/ngx-maplibre-gl/demo/terrain-control)
 * @see [TerrainControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/TerrainControl)
 */
@Directive({
  selector: '[mglTerrain]',
  standalone: true,
})
export class TerrainControlDirective implements AfterContentInit {
  /* Init injection */
  private readonly mapService = inject(MapService);
  private readonly controlComponent = inject<ControlComponent<TerrainControl>>(
    ControlComponent,
    { host: true }
  );

  /* Init inputs */
  @Input() source: string;
  @Input() exaggeration?: number;

  ngAfterContentInit() {
    this.mapService.mapCreated$.subscribe(() => {
      if (this.controlComponent.control) {
        throw new Error('Another control is already set for this control');
      }

      const options: TerrainSpecification = {
        source: this.source,
        exaggeration: this.exaggeration ?? 1,
      };

      this.controlComponent.control = new TerrainControl(options);

      this.mapService.addControl(
        this.controlComponent.control,
        this.controlComponent.position
      );
    });
  }
}
