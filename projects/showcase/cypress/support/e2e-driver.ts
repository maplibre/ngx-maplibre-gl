/// <reference types="cypress" />
import { CypressHelper } from "@shellygo/cypress-test-utils";
import { Assertable, then } from "@shellygo/cypress-test-utils/assertable";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

export class MapLibreAssertable<T> extends Assertable<T> {
  private comparePixels = (
    buffer1: Buffer,
    buffer2: Buffer,
    width: number,
    height: number
  ) => pixelmatch(buffer1, buffer2, null, width, height);

  private compareSnapshots = (
    snapshot: Cypress.Chainable<{
      buffer: Buffer;
      height: number;
      width: number;
    }>
  ) => {
    const snapshotChainable = this.chainable as unknown as Cypress.Chainable<{
      buffer: Buffer;
      height: number;
      width: number;
    }>;
    return then(
      snapshotChainable.then(
        (subject: { buffer: Buffer; height: number; width: number }) =>
          snapshot.then(({ buffer, width, height }) =>
            cy.wrap(this.comparePixels(buffer, subject.buffer, width, height))
          )
      )
    );
  };

  public shouldEqualSnapshot = (
    snapshot: Cypress.Chainable<{
      buffer: Buffer;
      height: number;
      width: number;
    }>
  ) => this.compareSnapshots(snapshot).shouldEqual(0);

  public shouldNotEqualSnapshot = (
    snapshot: Cypress.Chainable<{
      buffer: Buffer;
      height: number;
      width: number;
    }>
  ) => this.compareSnapshots(snapshot).shouldBeGreaterThen(0);
}
export class E2eDriver {
  private helper = new CypressHelper();

  beforeAndAfter = () => {
    beforeEach(() => {});
    afterEach(() => {});
  };

  given = {
    alertStub: () => cy.on("window:alert", this.helper.given.stub("alert")),
  };
  when = {
    wait: (ms: number) => this.helper.when.wait(ms),

    resetConsoleWarnings: () => {
      cy.get("@consoleWarnSpy").then((spy: any) => {
        if (spy.callCount > 0) {
          cy.log(`Clearing ${spy.callCount} console warning(s)...`);
          spy.resetHistory();
        }
      });
    },
    waitForFetch: (url: string, method: string = "GET") => {
      cy.intercept(method, url).as("awaitFetch");
      cy.wait("@awaitFetch");
    },
    waitForMapToIdle: () =>
      this.helper.when.waitUntil(() =>
        this.helper.get.bySelector("true", "data-idle")
      ),
    waitForMapLoaded: () =>
      this.helper.when.waitUntil(() =>
        this.helper.get.bySelector("true", "data-loaded")
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
      this.helper.get.element(".maplibregl-popup-close-button").click(),
    clickFromCodeRadioButton: () =>
      this.helper.when.doWithin(
        () => this.helper.when.toggle(0),
        "code-button"
      ),
    clickStreetsRadioButton: () =>
      this.helper.when.doWithin(
        () => this.helper.when.toggle(0),
        "streets-button"
      ),
    clickCountryNamesButton: () =>
      this.helper.when.click("countries-toggle-button"),

    clickZoomToBoundsButton: () => this.helper.when.click("zoom-button"),
    clickHelloCustomButton: () => this.helper.when.click("custom-control"),
    clickEnableTerrainControlButton: () =>
      this.helper.get.element(".maplibregl-ctrl-terrain").click(),
    clickDisableTerrainControlButton: () =>
      this.helper.get.element(".maplibregl-ctrl-terrain-enabled").click(),
    clickToggleShowControlsButton: () =>
      this.helper.when.click("toggle-show-controls"),

    visitMapPage: (url: string) => this.helper.when.visit(url),
  };

  get = {
    canvas: (): Cypress.Chainable<HTMLCanvasElement> =>
      this.helper.get
        .element("canvas.maplibregl-canvas", 0)
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
        .toDataURL("image/png")
        .replace(/data:.*;base64,/, "");
      const buff = Cypress.Buffer.from(base64, "base64");
      const png = PNG.sync.read(buff as any);
      return png.data;
    },

    mapObjectLoaded: () => this.helper.get.bySelector("true", "data-loaded"),
    mapTerrainButton: () => this.helper.get.element(".maplibregl-ctrl-terrain"),
    mapTerrainButtonEnabled: () =>
      this.helper.get.element(".maplibregl-ctrl-terrain-enabled"),
    mapLibreglPopup: () => this.helper.get.element(".maplibregl-popup"),
    mglPopup: () => this.helper.get.elementByTestId("mgl-popup"),
    mapLibrePopUpContent: () =>
      this.helper.get.elementByTestId("popup-content"),
    customControlButton: () =>
      this.helper.get.elementByTestId("custom-control"),
    fullscreenControl: () =>
      this.helper.get.element(".maplibregl-ctrl-fullscreen"),
    alertStub: () => this.helper.get.stub("alert"),
  };

  then = (chainable: Cypress.Chainable) => new MapLibreAssertable(chainable);

  private getCanvas(): Cypress.Chainable<any> {
    return cy.get("canvas.maplibregl-canvas").its(0).should("not.be.undefined");
  }

  private toImageBitmapBuffer(canvas: HTMLCanvasElement) {
    const base64 = canvas.toDataURL("image/png").replace(/data:.*;base64,/, "");
    const buff = Cypress.Buffer.from(base64, "base64");
    const png = PNG.sync.read(buff as any);
    return png.data;
  }
}
