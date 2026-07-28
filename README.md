
<div align="center">
  <img src="https://raw.githubusercontent.com/maplibre/ngx-maplibre-gl/main/projects/showcase/src/assets/ngx-maplibre-gl-red.svg" height="128">
</div>
<div align="center">
  <h1>ngx-maplibre-gl</h1>
</div>

Angular wrapper for [maplibre-gl](https://www.maplibre.org/). It exposes a bunch of components meant to be simple to use with Angular.

[![npm version](https://img.shields.io/npm/v/@maplibre/ngx-maplibre-gl.svg?style=flat)](https://www.npmjs.com/package/@maplibre/ngx-maplibre-gl)

### Demo site

Can be found here (based on the generated gh-pages in this repo):
https://maplibre.org/ngx-maplibre-gl/

### Attribution

This is a fork of [ngx-mapbox-gl](https://github.com/Wykks/ngx-mapbox-gl) and I would like to thank the maintainers there for their amazing work to build this up. It's truly a great piece of software!

### API Documentation

[The API documentation can be found here](https://maplibre.org/ngx-maplibre-gl/API/).

## How to start

```
npm install @maplibre/ngx-maplibre-gl maplibre-gl
yarn add @maplibre/ngx-maplibre-gl maplibre-gl
```

There might be a need to add the following configuration to `tsconfig.json` file

```
"compilerOptions": {
    ...
    "strictNullChecks": false,
    "skipLibCheck": true,
}
```

Load the CSS of `maplibre-gl`

For example, with _angular-cli_ add this in `angular.json`:

```json
"styles": [
  ...,
  "./node_modules/maplibre-gl/dist/maplibre-gl.css"
],
```

Or in the global CSS file (called `styles.css` for example in _angular-cli_):

```css
@import 'maplibre-gl/dist/maplibre-gl.css';
```

### Serve the MapLibre GL JS web worker

MapLibre GL JS v6 is ESM-only and loads its web worker from a separate file at
runtime. Bundlers cannot rewrite that URL, so every bundler-based app must point
MapLibre at it before the first map is created — see
[`setWorkerUrl()` is bundler-only](https://maplibre.org/maplibre-gl-js/docs/guides/v5-to-v6-migration-guide/#setworkerurl-is-bundler-only).
Without it **the worker 404s and no tiles render**. Here is the Angular setup.

Add both files to the `assets` of your `build` target in `angular.json`. The worker
imports `maplibre-gl-shared.mjs` as a sibling at runtime, so they must be copied
together, into the same directory:

```json
"assets": [
  ...,
  {
    "glob": "maplibre-gl-worker.mjs",
    "input": "node_modules/maplibre-gl/dist",
    "output": "/"
  },
  {
    "glob": "maplibre-gl-shared.mjs",
    "input": "node_modules/maplibre-gl/dist",
    "output": "/"
  }
]
```

Then provide the worker URL with `provideMaplibreWorker` in your application config:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideMaplibreWorker } from '@maplibre/ngx-maplibre-gl';

export const appConfig: ApplicationConfig = {
  providers: [provideMaplibreWorker('maplibre-gl-worker.mjs')],
};
```

The URL is resolved against `document.baseURI`, so it stays correct when your app
is deployed under a sub-path via `--base-href`. It can also be provided in a
component's `providers` to scope it to a subtree. The URL is applied lazily, right
before the first map is created — unlike calling `setWorkerUrl()` in `main.ts`,
this keeps `maplibre-gl` out of your initial bundle.

If you cannot use the provider, call `setWorkerUrl()` once yourself before the
first map is created instead:

```ts
import { setWorkerUrl } from 'maplibre-gl';

setWorkerUrl(new URL('maplibre-gl-worker.mjs', document.baseURI).href);
```

If you also run browser-based unit tests, do the same in your test setup file. When
tests are served by Vite, a `?url` import resolves the worker straight out of
`node_modules`:

```ts
import { setWorkerUrl } from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';

setWorkerUrl(new URL(workerUrl, document.baseURI).href);
```

### Upgrading MapLibre GL JS

Upgrading from v5? Follow the
[v5 to v6 migration guide](https://maplibre.org/maplibre-gl-js/docs/guides/v5-to-v6-migration-guide/).

Then, in your app's main module (or in any other module), import the `MapComponent`:

```ts
import { Component } from '@angular/core';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';

@Component({
  template: `
    <mgl-map
      [mapStyle]="'https://demotiles.maplibre.org/style.json'"
      [zoom]="[9]"
      [center]="[-74.5, 40]"
    >
    </mgl-map>
  `,
  styles: [
    `
      mgl-map {
        height: 100%;
        width: 100%;
      }
    `,
  ],
  imports: [MapComponent],
})
export class AppComponent {}
```

If you use several components, it will be convenient to import `NgxMapLibreGLModule` instead:

```ts
import { Component } from '@angular/core';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';

@Component({
  template: `
    <mgl-map
      [mapStyle]="'https://demotiles.maplibre.org/style.json'"
      [zoom]="[9]"
      [center]="[-74.5, 40]"
    >
      <mgl-control
        mglNavigation
        [visualizePitch]="true"
    />
    </mgl-map>
  `,
  styles: [
    `
      mgl-map {
        height: 100%;
        width: 100%;
      }
    `,
  ],
  imports: [NgxMapLibreGLModule]
})
export class AppComponent {}
```

