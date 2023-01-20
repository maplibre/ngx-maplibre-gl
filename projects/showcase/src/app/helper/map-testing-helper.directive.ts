import { Directive, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MapComponent } from 'ngx-maplibre-gl';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'mgl-map',
})
export class MapTestingHelperDirective implements OnInit, OnDestroy {
  // Since the Angular environment is production by default, our e2e tests don't
  // have a good way to reference the map component or underlying MapLibre-GL instance
  // in order to check the state of things beyond the DOM. This directive adds some
  // behavior to expose information as a global object that tests can access.

  constructor(private map: MapComponent) {
    this.map.preserveDrawingBuffer = true;
  }

  @HostListener('idle', ['$event']) onMapIdle(data: any) {
    (window as any).mglMapTestHelper.map = data.target;
    (window as any).mglMapTestHelper.idle = true;
  }

  @HostListener('render', ['$event']) onMapRender(data: any) {
    (window as any).mglMapTestHelper.map = data.target;
    (window as any).mglMapTestHelper.idle = false;
  }

  @HostListener('mapLoad', ['$event']) onMapLoad(data: any) {
    (window as any).mglMapTestHelper.map = data.target;
    (window as any).mglMapTestHelper.loaded = true;
  }

  ngOnInit() {
    (window as any).mglMapTestHelper = {
      mapComponent: this.map,
    };
  }

  ngOnDestroy(): void {
    (window as any).mglMapTestHelper = undefined;
  }
}
