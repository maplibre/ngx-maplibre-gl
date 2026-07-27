import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import {
  provideClientHydration,
  withNoIncrementalHydration,
} from '@angular/platform-browser';
import { provideMaplibreWorker } from '@maplibre/ngx-maplibre-gl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(withNoIncrementalHydration()),
    // MapLibre GL JS v6 loads its worker from a separate file. The worker (and
    // the `maplibre-gl-shared.mjs` sibling it imports) are copied into the
    // output via the `assets` entries in angular.json and pointed at here.
    // Providing the URL instead of calling `setWorkerUrl()` in main.ts keeps
    // `maplibre-gl` out of the initial bundle.
    provideMaplibreWorker('maplibre-gl-worker.mjs'),
  ],
};
