import { Project } from '@stackblitz/sdk/types/interfaces';
import {
  ANGULAR_JSON,
  INDEX_HTML,
  MAIN_TS,
  NPMRC,
  packageJson,
  STYLES_CSS,
  TSCONFIG,
  TSCONFIG_APP,
} from './templates';

function toPascalCase(text: string) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

function clearAndUpper(text: string) {
  return text.replace(/-/, '').toUpperCase();
}

export function createStackblitzProject(
  demoFiles: Record<string, string>,
  exampleName: string,
): Project {
  return {
    files: {
      'package.json': packageJson({
        '@angular/build': '^22',
        '@angular/cli': '^22',
        '@angular/compiler-cli': '^22',
        '@angular/common': '^22',
        '@angular/compiler': '^22',
        '@angular/core': '^22',
        '@angular/forms': '^22',
        '@angular/platform-browser': '^22',
        '@angular/router': '^22',
        '@angular/material': '^22',
        '@angular/cdk': '^22',
        'maplibre-gl': '*',
        '@maplibre/maplibre-gl-style-spec': '*',
        '@maplibre/ngx-maplibre-gl': '*',
        '@types/supercluster': '*',
        '@types/geojson': '*',
      }),
      '.npmrc': NPMRC,
      'angular.json': ANGULAR_JSON,
      'tsconfig.json': TSCONFIG,
      'tsconfig.app.json': TSCONFIG_APP,
      'src/index.html': INDEX_HTML,
      'src/main.ts': MAIN_TS.replace(
        /###/g,
        toPascalCase(exampleName) + 'Component',
      ),
      'src/styles.css': STYLES_CSS,
      ...demoFiles,
    },
    title: 'ngx-maplibre-gl demo: ' + exampleName,
    description: '',
    template: 'node',
  };
}
