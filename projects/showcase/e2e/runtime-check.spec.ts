import { describe, test } from './support/fixtures';
import { E2eDriver } from './support/e2e-driver';

/** Every demo that should render a map without logging errors or warnings. */
const DEMO_ROUTES = [
  'display-map',
  'custom-style-id',
  'set-style',
  'satellite-map',
  'add-image-generated',
  'add-image',
  'toggle-layers',
  '3d-buildings',
  'cluster',
  'heatmap',
  'geojson-line',
  'ngx-geojson-line',
  'custom-marker-icons',
  'ngx-custom-marker-icons',
  'ngx-marker-rotate',
  'live-update-feature',
  'live-update-image-source',
  'popup',
  'set-popup',
  'fullscreen',
  'navigation',
  'locate-user',
  'attribution-position',
  'ngx-scale-control',
  'ngx-custom-control',
  'interactive-false',
  'language-switch',
  'center-on-symbol',
  'ngx-drag-a-point',
  'drag-a-marker',
  'hover-styles',
  'popup-on-click',
  'zoomto-linestring',
  'cluster-html',
  'ngx-cluster-html',
  'polygon-popup-on-click',
  'custom-attribution',
  'custom-locale',
  'marker-alignment',
  'terrain-style',
  'terrain-control',
  'terrain',
];

describe('Generic runtime error check', () => {
  const { when, get, then, beforeAndAfter } = new E2eDriver();

  beforeAndAfter();

  for (const route of DEMO_ROUTES) {
    test(`should display a map without errors for /${route}`, async () => {
      await when.visitMapPage(`/demo/${route}`);
      await then(get.map()).shouldExist();
      await then(get.mapObjectLoaded()).shouldExist();
    });
  }

  test('should not throw an error for /add-image-missing-generated after idle', async () => {
    await when.visitMapPage('/demo/add-image-missing-generated');
    await then(get.map()).shouldExist();
    await when.waitForMapToIdle();
  });
});
