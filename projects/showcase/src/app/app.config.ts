import { ApplicationConfig, Injectable } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideMarkdown } from 'ngx-markdown';
import { provideAnimations } from '@angular/platform-browser/animations';
//import { MapTestingHelperDirective } from './helper/map-testing-helper.directive';
//import { MapService } from '@maplibre/ngx-maplibre-gl';

@Injectable({
  providedIn: 'root'
})
export class MapServiceForTesting {
  constructor() {
    console.info("HERE!!!!!");
    //this.mapService.mapCreated$.subscribe(() => {
    //  console.info("HERE!!!");
    //  this.mapService.mapInstance._preserveDrawingBuffer = true;
    //})
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideMarkdown(),
    provideAnimations(),
    MapServiceForTesting
  ],
};
