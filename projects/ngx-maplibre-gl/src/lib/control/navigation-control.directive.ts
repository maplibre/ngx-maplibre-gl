import { AfterContentInit, Directive, Host, Input } from '@angular/core';
import { NavigationControl } from 'maplibre-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';

/**
 * `mglNavigation` - a navigation control directive
 * 
 * @category Directives
 */
@Directive({
  selector: '[mglNavigation]',
  standalone: true,
})
export class NavigationControlDirective implements AfterContentInit {
  /* Init inputs */
  @Input() showCompass?: boolean;
  @Input() showZoom?: boolean;
  @Input() visualizePitch?: boolean;

  constructor(
    private mapService: MapService,
    @Host() private controlComponent: ControlComponent<NavigationControl>
  ) {}

  ngAfterContentInit() {
    this.mapService.mapCreated$.subscribe(() => {
      if (this.controlComponent.control) {
        throw new Error('Another control is already set for this control');
      }

      const options: {
        showCompass?: boolean;
        showZoom?: boolean;
        visualizePitch?: boolean;
      } = {};

      if (this.showCompass !== undefined) {
        options.showCompass = this.showCompass;
      }

      if (this.showZoom !== undefined) {
        options.showZoom = this.showZoom;
      }

      if (this.visualizePitch != undefined) {
        options.visualizePitch = this.visualizePitch;
      }

      this.controlComponent.control = new NavigationControl(options);
      this.mapService.addControl(
        this.controlComponent.control,
        this.controlComponent.position
      );
    });
  }
}
