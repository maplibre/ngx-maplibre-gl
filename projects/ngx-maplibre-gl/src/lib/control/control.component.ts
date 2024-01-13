import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ControlPosition, IControl } from 'maplibre-gl';
import { MapService } from '../map/map.service';

export class CustomControl implements IControl {
  constructor(private container: HTMLElement) {}

  onAdd() {
    return this.container;
  }

  onRemove() {
    return this.container.parentNode!.removeChild(this.container);
  }

  getDefaultPosition(): ControlPosition {
    return 'top-right';
  }
}

@Component({
  selector: 'mgl-control',
  template: '<div class="maplibregl-ctrl" #content><ng-content></ng-content></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ControlComponent<T extends IControl>
  implements OnDestroy, AfterContentInit {
  /* Init inputs */
  @Input() position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

  @ViewChild('content', { static: true }) content: ElementRef;

  control: T | CustomControl;

  constructor(private mapService: MapService) {}

  ngAfterContentInit() {
    if (this.content.nativeElement.childNodes.length) {
      this.control = new CustomControl(this.content.nativeElement);
      this.mapService.mapCreated$.subscribe(() => {
        this.mapService.addControl(this.control!, this.position);
      });
    }
  }

  ngOnDestroy() {
    if (this.mapService.mapInstance.hasControl(this.control)) {
      this.mapService.removeControl(this.control);
    }
  }
}
