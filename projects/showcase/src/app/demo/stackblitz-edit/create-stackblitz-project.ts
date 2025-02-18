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
      'src/polyfills.ts': `import 'zone.js';`,
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
      '@angular/animations': '^19',
      '@angular/common': '^19',
      '@angular/compiler': '^19',
      '@angular/core': '^19',
      '@angular/forms': '^19',
      '@angular/platform-browser': '^19',
      '@angular/router': '^19',
      '@angular/material': '^19',
      '@angular/cdk': '^19',
      url: '*',
      querystring: '*',
      events: '*',
      '@types/supercluster': '*',
      '@types/geojson': '*',
    },
    /* eslint-enable @typescript-eslint/naming-convention */
  };
}
