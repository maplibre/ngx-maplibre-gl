import { E2eDriver } from '../support/e2e-driver';

describe('Generic runtime error check', () => {
  let when: typeof E2eDriver.prototype.when,
    get: typeof E2eDriver.prototype.get,
    then: typeof E2eDriver.prototype.then;
  const { beforeAndAfter } = new E2eDriver();

  beforeAndAfter();

  beforeEach(() => {
    ({ when, get, then } = new E2eDriver());
  });

  [
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
    'ive-update-feature',
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
    'add-image-missing-generated',
    'custom-attribution',
    'custom-locale',
    'marker-alignment',
    'terrain-style',
    'terrain-control',
    'terrain'
  ].forEach((route: string) => {
    it(`should display a map without errors for /${route}`, () => {
      when.visitMapPage(`/demo/${route}`);
      then(get.map()).shouldExist();
      then(get.mapObjectLoaded()).shouldExist();
      when.resetConsoleWarnings();
    });
  });
});
