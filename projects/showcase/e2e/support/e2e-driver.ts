import { PNG } from 'pngjs';
import { afterEach } from './fixtures';
import { PlaywrightHelper } from './playwright-helper';
import {
  MapLibreAssertable,
  type MapSnapshot,
  type MapSnapshotQuery,
} from './maplibre-assertable';

/**
 * The showcase-specific driver. It builds on the generic {@link PlaywrightHelper}
 * - spreading its `given`/`when`/`get` primitives and adding domain concepts
 * (visiting a demo, waiting for the map to settle, reading the canvas back). All
 * Playwright access goes through the helper; the driver never touches `page`
 * directly, and specs never touch Playwright at all.
 */
export class E2eDriver {
  private readonly helper = new PlaywrightHelper();

  given = {
    ...this.helper.given,

    /** Dismisses the next `alert()` and resolves with its message. */
    alertStub: () => this.helper.given.onDialog(),

    interceptStreetsSprite: () =>
      this.helper.given.intercept(/\/streets\/sprite.*\.png/, 'streets'),
  };

  when = {
    ...this.helper.when,

    visitMapPage: async (url: string) => {
      await this.helper.when.visit(url);
      await this.then(this.get.map()).shouldBeVisible();
    },

    waitForStreetsSpriteResponse: () =>
      this.helper.when.waitForResponse('streets'),

    /** Waits for `mgl-map` to report a completed `load` event. */
    waitForMapLoaded: () => this.then(this.get.mapObjectLoaded()).shouldExist(),

    /** Waits for `mgl-map` to report `idle`, i.e. rendering has settled. */
    waitForMapToIdle: () =>
      this.then(
        this.helper.get.elementByAttribute('data-idle', 'true')
      ).shouldExist(),

    waitForDisabledTerrainButton: () =>
      this.then(this.get.mapTerrainButton()).shouldBeVisible(),
    waitForEnabledTerrainButton: () =>
      this.then(this.get.mapTerrainButtonEnabled()).shouldBeVisible(),
    waitForFullScreenControls: () =>
      this.then(this.get.fullscreenControl()).shouldBeVisible(),
    waitForCustomButton: () =>
      this.then(this.get.customControlButton()).shouldBeVisible(),

    clickLanguageButton: (language: string) =>
      this.helper.when.click(`lang-button-${language}`),
    clickPopupCloseButton: () =>
      this.helper.when.clickBySelector('.maplibregl-popup-close-button'),
    clickFromCodeRadioButton: () => this.helper.when.click('code-button'),
    clickStreetsRadioButton: () => this.helper.when.click('streets-button'),
    clickCountryNamesButton: () =>
      this.helper.when.click('countries-toggle-button'),
    clickZoomToBoundsButton: () => this.helper.when.click('zoom-button'),
    clickHelloCustomButton: () => this.helper.when.click('custom-control'),
    clickEnableTerrainControlButton: () =>
      this.helper.when.clickBySelector('.maplibregl-ctrl-terrain'),
    clickDisableTerrainControlButton: () =>
      this.helper.when.clickBySelector('.maplibregl-ctrl-terrain-enabled'),
    clickToggleShowControlsButton: () =>
      this.helper.when.click('toggle-show-controls'),
  };

  get = {
    ...this.helper.get,

    map: () => this.helper.get.element('canvas.maplibregl-canvas'),

    /**
     * Reads the map canvas back as raw RGBA pixels, re-reading on every
     * assertion. Relies on the demos setting `preserveDrawingBuffer`, without
     * which the canvas reads back blank.
     */
    imageSnapshot: (): MapSnapshotQuery =>
      this.helper.query(async () => {
        const { width, height, dataUrl } = await this.get
          .map()
          .first()
          .evaluate((canvas: HTMLCanvasElement) => ({
            width: canvas.width,
            height: canvas.height,
            dataUrl: canvas.toDataURL('image/png'),
          }));
        const png = PNG.sync.read(
          Buffer.from(dataUrl.replace(/^data:.*;base64,/, ''), 'base64')
        );
        return { width, height, data: png.data } satisfies MapSnapshot;
      }),

    mapObjectLoaded: () =>
      this.helper.get.elementByAttribute('data-loaded', 'true'),
    mapTerrainButton: () => this.helper.get.element('.maplibregl-ctrl-terrain'),
    mapTerrainButtonEnabled: () =>
      this.helper.get.element('.maplibregl-ctrl-terrain-enabled'),
    mglPopup: () => this.helper.get.elementByTestId('mgl-popup'),
    mapLibrePopUpContent: () => this.helper.get.elementByTestId('popup-content'),
    customControlButton: () => this.helper.get.elementByTestId('custom-control'),
    fullscreenControl: () =>
      this.helper.get.element('.maplibregl-ctrl-fullscreen'),
  };

  then = <T>(target: T) => new MapLibreAssertable(target);

  /**
   * Fails the test if the demo threw or logged an error/warning while it ran.
   * The spies themselves are installed by the auto fixture before the page loads,
   * so there is nothing to arrange beforehand.
   */
  beforeAndAfter = () => {
    afterEach(async () => {
      await this.then(this.get.uncaughtErrors()).shouldBeEmpty();
      await this.then(this.get.consoleMessages()).shouldBeEmpty();
    });
  };
}
