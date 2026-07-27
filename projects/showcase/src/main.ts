import { bootstrapApplication } from '@angular/platform-browser';
import { setWorkerUrl } from 'maplibre-gl';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// MapLibre GL JS v6 loads its worker from a separate file. Bundlers inline
// `maplibre-gl` itself but cannot rewrite the worker URL, so the worker (and the
// `maplibre-gl-shared.mjs` sibling it imports) are copied into the output via the
// `assets` entries in angular.json and pointed at here.
setWorkerUrl(new URL('maplibre-gl-worker.mjs', document.baseURI).href);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
