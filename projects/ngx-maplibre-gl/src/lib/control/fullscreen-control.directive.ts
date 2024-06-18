import {
  AfterContentInit,
  Directive,
  HostListener,
  Input,
  inject,
} from '@angular/core';
import { FullscreenControl } from 'maplibre-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';

/**
 * `mglFullscreen` - a fullscreen control directive
 *
 * @category Directives
 */
@Directive({
  selector: '[mglFullscreen]',
  standalone: true,
})
export class FullscreenControlDirective implements AfterContentInit {
  /* Init injection */
  private readonly mapService = inject(MapService);
  private readonly controlComponent = inject<
    ControlComponent<FullscreenControl>
  >(ControlComponent, { host: true });

  /* Init inputs */
  @Input() container?: HTMLElement;
  @HostListener('window:webkitfullscreenchange', ['$event.target'])
  onFullscreen() {
    this.mapService.mapInstance.resize();
  }

  ngAfterContentInit() {
    this.mapService.mapCreated$.subscribe(() => {
      if (this.controlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      this.controlComponent.control = new FullscreenControl({
        container: this.container,
      });
      this.mapService.addControl(
        this.controlComponent.control,
        this.controlComponent.position
      );
    });
  }
}
