import { AfterContentInit, Directive, Host, Input } from '@angular/core';
import { TerrainControl, TerrainSpecification } from 'maplibre-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';

/**
 * `mglTerrain` - a terrain control directive
 * 
 * @category Directives
 */
@Directive({
  selector: '[mglTerrain]',
  standalone: true,
})
export class TerrainControlDirective implements AfterContentInit {
  /* Init inputs */
  @Input() source: string;
  @Input() exaggeration?: number;

  constructor(
    private mapService: MapService,
    @Host() private controlComponent: ControlComponent<TerrainControl>
  ) {}

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
