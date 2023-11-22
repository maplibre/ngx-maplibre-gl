import { Directive, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';

@Directive({
    selector: 'mgl-map',
    standalone: true,
})
export class MapTestingHelperDirective implements OnInit, OnDestroy {
  // Since the Angular environment is production by default, our e2e tests don't
  // have a good way to reference the map component or underlying MapLibre-GL instance
  // in order to check the state of things beyond the DOM. This directive adds some
  // behavior to expose information as a global object that tests can access.

  constructor(private map: MapComponent) {
    if (window.Cypress != null) {
      console.info('Cypress detected. Setting preserveDrawingBuffer=true');
      this.map.preserveDrawingBuffer = true;
    }
  }

  @HostListener('idle', ['$event']) onMapIdle(data: any) {
    window.mglMapTestHelper.map = data.target;
    window.mglMapTestHelper.idle = true;
  }

  @HostListener('render', ['$event']) onMapRender(data: any) {
    window.mglMapTestHelper.map = data.target;
    window.mglMapTestHelper.idle = false;
  }

  @HostListener('mapLoad', ['$event']) onMapLoad(data: any) {
    window.mglMapTestHelper.map = data.target;
    window.mglMapTestHelper.loaded = true;
  }

  ngOnInit() {
    window.mglMapTestHelper = {
      mapComponent: this.map,
    };
  }

  ngOnDestroy(): void {
    window.mglMapTestHelper = undefined;
  }
}

declare global {
  interface Window {
    mglMapTestHelper: any;
    Cypress: any;
  }
}
