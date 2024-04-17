
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

This is a fork of [ngx-mapbox-gl](https://github.com/Wykks/ngx-mapbox-gl) and I would like to thank the maintainers there for thier amazing work to build this up. It's truely a great piece of software!

### API Documentation

[The API documentation can be found here](https://maplibre.org/ngx-maplibre-gl/API/modules.html).

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
@import '~maplibre-gl/dist/maplibre-gl.css';
```

Then, in your app's main module (or in any other module), import the `MapComponent`:

```ts
import { Component } from '@angular/core';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';

@NgModule({
  template: `
    <mgl-map
      [style]="'https://demotiles.maplibre.org/style.json'"
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
  standalone: true,
  imports: [MapComponent],
})
export class AppComponent {}
```
