import { Project } from '@stackblitz/sdk/types/interfaces';

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
      /* eslint-disable @typescript-eslint/naming-convention */
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
      ...demoFiles,
    },
    title: '',
    description: '',
    template: 'angular-cli',
    dependencies: {
      tslib: '*',
      'maplibre-gl': '*',
      '@maplibre/maplibre-gl-style-spec': '*',
      '@maplibre/ngx-maplibre-gl': '*',
      '@angular/common': '^20',
      '@angular/compiler': '^20',
      '@angular/core': '^20',
      '@angular/forms': '^20',
      '@angular/platform-browser': '^20',
      '@angular/router': '^20',
      '@angular/material': '^20',
      '@angular/cdk': '^20',
      url: '*',
      querystring: '*',
      events: '*',
      '@types/supercluster': '*',
      '@types/geojson': '*',
    },
    /* eslint-enable @typescript-eslint/naming-convention */
  };
}
