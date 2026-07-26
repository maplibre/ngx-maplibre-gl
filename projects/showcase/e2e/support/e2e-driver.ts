import { PNG } from 'pngjs';
import { afterEach } from './fixtures';
import { PlaywrightHelper } from './playwright-helper';
import {
  diffPixels,
  MapLibreAssertable,
  type MapSnapshot,
  type MapSnapshotQuery,
} from './maplibre-assertable';

/** How long to wait for the canvas to stop changing before giving up. */
const STABILITY_TIMEOUT_MS = 30_000;
/** Gap between the two readbacks that have to match for the map to count as settled. */
const STABILITY_INTERVAL_MS = 500;

/**
 * Console output no demo can do anything about, so it must not fail a test.
 * Keep this list short and specific - anything else is a real signal.
 */
const IGNORED_CONSOLE_MESSAGES = [
  // Vector basemap styles build icon names from tile data (a 5-character road
  // ref wants `us-interstate_5`, an OSM class wants `sports_centre`), and every
  // style we have tried ships a sprite that does not cover every value present
  // in the tiles. An upstream style/sprite gap, not something this library or
  // the demos control.
  /Image ".*" could not be loaded/,
];

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

    /**
     * Records the vector basemap's sprite request, which the set-style spec uses
     * as a marker that the style has actually been swapped back in.
     */
    interceptBasemapSprite: () =>
      this.helper.given.intercept(/\/sprites\/.*\.png/, 'basemap-sprite'),
  };

  when = {
    ...this.helper.when,

    visitMapPage: async (url: string) => {
      await this.helper.when.visit(url);
      await this.then(this.get.map()).shouldBeVisible();
    },

    waitForBasemapSpriteResponse: () =>
      this.helper.when.waitForResponse('basemap-sprite'),

    /**
     * Captures a baseline the rest of a spec compares against, once the canvas
     * has actually stopped changing.
     *
     * `waitForMapToIdle` is not enough on its own: `data-idle` is left behind by
     * a *previous* idle, so it can already be set while the map is still
     * settling. A baseline taken then is transient, and every later comparison
     * measures against a frame the map will never show again - which is how a
     * `shouldEqualSnapshot` ends up never converging.
     */
    captureStableSnapshot: async (): Promise<MapSnapshot> => {
      let previous = await this.get.imageSnapshot().get();
      const deadline = Date.now() + STABILITY_TIMEOUT_MS;
      while (true) {
        await this.helper.when.wait(STABILITY_INTERVAL_MS);
        const current = await this.get.imageSnapshot().get();
        if (diffPixels(previous, current) === 0) {
          return current;
        }
        if (Date.now() >= deadline) {
          throw new Error(
            'The map never stopped changing, so no stable baseline could be captured.'
          );
        }
        previous = current;
      }
    },

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

    /** Console errors and warnings the demo itself is responsible for. */
    relevantConsoleMessages: () =>
      this.helper.query(async () => {
        const messages = await this.helper.get.consoleMessages().get();
        return messages.filter(
          (message) =>
            !IGNORED_CONSOLE_MESSAGES.some((pattern) => pattern.test(message))
        );
      }),
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
      await this.then(this.get.relevantConsoleMessages()).shouldBeEmpty();
    });
  };
}
