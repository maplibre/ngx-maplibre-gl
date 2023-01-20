import { E2eDriver } from '../support/e2e-driver';

describe('Generic runtime error check', () => {
  let driver = new E2eDriver();

  [
    'display-map',
    'custom-style-id',
    'satellite-map',
    'add-image-generated',
    'add-image',
    'cluster',
    'heatmap',
    'geojson-line',
    'ngx-geojson-line',
    'custom-marker-icons',
    'ngx-custom-marker-icons',
    'set-popup',
    'fullscreen',
    'navigation',
    'locate-user',
    'attribution-position',
    'ngx-scale-control',
    'interactive-false',
    'center-on-symbol',
    'ngx-drag-a-point',
    'hover-styles',
    'popup-on-click',
    'cluster-html',
    'ngx-cluster-html',
    '3d-buildings',
    'polygon-popup-on-click',
    'add-image-missing-generated',
    'terrain-style',
    'terrain-control',
    'terrain',
  ].forEach((route: string) => {
    it(`should display a map without errors for /${route}`, () => {
      driver
        .visitMapPage(`/demo/${route}`)
        .assert.mapCanvasExists()
        .assert.mapObjectLoaded();
    });
  });
});
