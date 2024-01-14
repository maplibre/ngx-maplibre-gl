import { PNG } from 'pngjs';
import { MapLibreAssertable, MaplibreCypressHelper } from './maplibre-helper';

export class E2eDriver {
  private helper = new MaplibreCypressHelper();

  beforeAndAfter = () => {
    beforeEach(() => {});
    afterEach(() => {});
  };

  given = {
    alertStub: () => this.helper.given.onAlert(this.helper.given.stub('alert')),
    interceptStreetsSprite: () =>
      this.helper.given.intercept('**/streets/sprite.png', 'streets'),
  };
  when = {
    wait: (ms: number) => this.helper.when.wait(ms),

    resetConsoleWarnings: () => this.helper.when.resetConsoleWarnings(),
    waitForStreetsSpriteResponse: (url: string, method: string = 'GET') =>
      this.helper.when.waitForResponse('streets'),
    waitForMapToIdle: () =>
      this.helper.when.waitUntil(() =>
        this.helper.get.bySelector('true', 'data-idle'),
      ),
    waitForMapLoaded: () =>
      this.helper.when.waitUntil(() =>
        this.helper.get.bySelector('true', 'data-loaded'),
      ),
    waitForDisabledTerrainButton: () =>
      this.helper.when.waitUntil(() => this.get.mapTerrainButton()),
    WaitForEnabledTerrainButton: () =>
      this.helper.when.waitUntil(() => this.get.mapTerrainButtonEnabled()),
    waitForFullScreenControls: () =>
      this.helper.when.waitUntil(() => this.get.fullscreenControl()),
    waitForCustomButton: () =>
      this.helper.when.waitUntil(() => this.get.customControlButton()),
    clickLanguageButton: (language: string) =>
      this.helper.when.click(`lang-button-${language}`),
    clickPopupCloseButton: () =>
      this.helper.get.element('.maplibregl-popup-close-button').click(),
    clickFromCodeRadioButton: () =>
      this.helper.when.doWithin(
        () => this.helper.when.toggle(0),
        'code-button',
      ),
    clickStreetsRadioButton: () =>
      this.helper.when.doWithin(
        () => this.helper.when.toggle(0),
        'streets-button',
      ),
    clickCountryNamesButton: () =>
      this.helper.when.click('countries-toggle-button'),

    clickZoomToBoundsButton: () => this.helper.when.click('zoom-button'),
    clickHelloCustomButton: () => this.helper.when.click('custom-control'),
    clickEnableTerrainControlButton: () =>
      this.helper.get.element('.maplibregl-ctrl-terrain').click(),
    clickDisableTerrainControlButton: () =>
      this.helper.get.element('.maplibregl-ctrl-terrain-enabled').click(),
    clickToggleShowControlsButton: () =>
      this.helper.when.click('toggle-show-controls'),

    visitMapPage: (url: string) => this.helper.when.visit(url),
  };

  get = {
    canvas: (): Cypress.Chainable<HTMLCanvasElement> =>
      this.helper.get
        .element('canvas.maplibregl-canvas', 0)
        .its(0) as unknown as Cypress.Chainable<HTMLCanvasElement>,

    imageSnapshot: () => {
      const snapshot = this.get
        .canvas()
        .then((mapCanvas: HTMLCanvasElement) => ({
          width: mapCanvas.width,
          height: mapCanvas.height,
          buffer: this.get.imageBitmapBuffer(mapCanvas),
        }));
      this.get.canvas();

      return snapshot;
    },

    imageBitmapBuffer: (canvas: HTMLCanvasElement) => {
      const base64 = canvas
        .toDataURL('image/png')
        .replace(/data:.*;base64,/, '');
      const buff = Cypress.Buffer.from(base64, 'base64');
      const png = PNG.sync.read(buff as any);
      return png.data;
    },

    mapObjectLoaded: () => this.helper.get.bySelector('true', 'data-loaded'),
    mapTerrainButton: () => this.helper.get.element('.maplibregl-ctrl-terrain'),
    mapTerrainButtonEnabled: () =>
      this.helper.get.element('.maplibregl-ctrl-terrain-enabled'),
    mapLibreglPopup: () => this.helper.get.element('.maplibregl-popup'),
    mglPopup: () => this.helper.get.elementByTestId('mgl-popup'),
    mapLibrePopUpContent: () =>
      this.helper.get.elementByTestId('popup-content'),
    customControlButton: () =>
      this.helper.get.elementByTestId('custom-control'),
    fullscreenControl: () =>
      this.helper.get.element('.maplibregl-ctrl-fullscreen'),
    alertStub: () => this.helper.get.stub('alert'),
  };

  then = (chainable: Cypress.Chainable) => new MapLibreAssertable(chainable);
}
