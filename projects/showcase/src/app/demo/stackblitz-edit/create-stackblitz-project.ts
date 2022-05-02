import { Project } from '@stackblitz/sdk/typings/interfaces';

function toPascalCase(text: string) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

function clearAndUpper(text: string) {
  return text.replace(/-/, '').toUpperCase();
}

export function createStackblitzProject(
  projectbase: string[],
  demoFiles: Record<string, string>,
  exampleName: string
): Project {
  return {
    files: {
      'src/main.ts': projectbase[0].replace(
        /###/g,
        toPascalCase(exampleName) + 'Component'
      ),
      'angular.json': projectbase[1],
      'src/index.html': '<showcase-demo></showcase-demo>',
      'src/styles.css': `
html, body {
  display: flex;
  flex: 1;
  min-height: 100vh;
  margin: 0;
}
`,
      'src/polyfills.ts': `
import 'zone.js';
(window as any).global = window;
`,
      ...demoFiles,
    },
    title: '',
    description: '',
    template: 'angular-cli',
    dependencies: {
      tslib: '*',
      'maplibre-gl': '*',
      '@maplibre/ngx-maplibre-gl': '*',
      '@angular/cdk': '^13',
      '@angular/material': '^13',
      '@angular/animations': '^13',
      '@angular/forms': '^13',
      '@angular/common': '^13',
      '@angular/compiler': '^13',
      '@angular/core': '^13',
      '@angular/platform-browser': '^13',
      '@angular/platform-browser-dynamic': '^13',
      '@angular/router': '^13',
      url: '*',
      querystring: '*',
      events: '*',
      '@types/supercluster': '*',
      '@types/geojson': '*',
    },
  };
}
