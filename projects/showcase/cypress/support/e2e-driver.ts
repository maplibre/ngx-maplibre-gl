/// <reference types="cypress" />
import Sinon from 'cypress/types/sinon';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

export class E2eDriver {
  private center: { lng: number; lat: number };
  private zoom: number;
  private width: number;
  private height: number;
  private referenceImageBuffer: Buffer;
  private alertStub: Cypress.Agent<Sinon.SinonStub<any[], any>>;

  visitMapPage = (url: string): E2eDriver => {
    cy.visit(url);
    this.alertStub = cy.stub().as('alertStub');
    return this;
  };

  // Aliased
  waitForMapToIdle = (timeout: number = 30000): E2eDriver => {
    return this.when.waitForMapToIdle(timeout);
  };

  takeImageSnapshot = (): E2eDriver => {
    this.initReferenceImage();

    // Snapshot the current map center coordinates
    cy.window().then((win: any) => {
      this.center = win.mglMapTestHelper.map.getCenter();
      this.zoom = win.mglMapTestHelper.map.getZoom();
      cy.log(
        `Map snapshot = Center: ${this.center.lng}, ${this.center.lat}, Zoom: ${this.zoom}`
      );
    });

    return this;
  };

  when = {
    wait: (ms: number): E2eDriver => {
      cy.wait(ms);
      return this;
    },
    waitForFetch: (url: string, method: string = 'GET'): E2eDriver => {
      cy.intercept(method, url).as('awaitFetch');
      cy.wait('@awaitFetch', { timeout: 30000 });
      return this;
    },
    waitForMapToIdle: (timeout: number = 30000): E2eDriver => {
      cy.window()
        .its('mglMapTestHelper.idle', { timeout: timeout })
        .should('equal', true);
      return this;
    },
    clickLanguageButton: (language: string): E2eDriver => {
      cy.get('.lang-button').contains(language).click();
      return this;
    },
    clickPopupCloseButton: (): E2eDriver => {
      cy.get('.maplibregl-popup-close-button').click();
      return this;
    },
    clickFromCodeRadioButton: (): E2eDriver => {
      cy.get('mat-radio-button').contains('from code').click();
      return this;
    },
    clickStreetsRadioButton: (): E2eDriver => {
      cy.get('mat-radio-button').contains('streets').click();
      return this;
    },
    clickCountryNamesButton: (): E2eDriver => {
      cy.get('mat-button-toggle').contains('countries names').click();
      return this;
    },
    clickZoomToBoundsButton: (): E2eDriver => {
      cy.get('.zoom-button').click();
      return this;
    },
    clickHelloCustomButton: (): E2eDriver => {
      cy.on('window:alert', this.alertStub);
      cy.get('.custom-control').click();
      return this;
    },
  };

  assert = {
    isSameAsSnapshot: (): E2eDriver => {
      this.compareToReference().should('eq', 0);
      return this;
    },
    isNotSameAsSnapshot: (): E2eDriver => {
      this.compareToReference().should('be.gt', 0);
      return this;
    },
    mapCanvasExists: (): E2eDriver => {
      cy.get('canvas.maplibregl-canvas').should('have.length', 1);
      return this;
    },
    mapObjectLoaded: (): E2eDriver => {
      cy.window()
        .its('mglMapTestHelper.loaded', { timeout: 10000 })
        .should('equal', true);
      return this;
    },
    mapHasPanned: (): E2eDriver => {
      cy.window().then((win: any) => {
        const center = win.mglMapTestHelper.map.getCenter();
        cy.wrap(center).should('not.deep.equal', this.center);
      });
      return this;
    },
    mapHasZoomedIn: (): E2eDriver => {
      cy.window().then((win: any) => {
        const zoom = win.mglMapTestHelper.map.getZoom();
        cy.wrap(zoom).should('be.gt', this.zoom);
      });
      return this;
    },
    mapHasZoomedOut: (): E2eDriver => {
      cy.window().then((win: any) => {
        const zoom = win.mglMapTestHelper.map.getZoom();
        cy.wrap(zoom).should('be.lt', this.zoom);
      });
      return this;
    },
    helloWorldPopupExists: (): E2eDriver => {
      cy.get('.maplibregl-popup').should('exist');
      cy.get('.custom-popup-class1').should('exist');
      cy.get('.custom-popup-class2').should('exist');
      cy.get('.maplibregl-popup-content').within(() => {
        cy.get('div').should('have.text', 'Hello world !');
      });
      return this;
    },
    helloWorldPopupDoesNotExist: (): E2eDriver => {
      cy.get('.maplibregl-popup').should('not.exist');
      return this;
    },
    customHelloButtonExists: (): E2eDriver => {
      cy.get('.custom-control').should('have.text', ' Hello ');
      return this;
    },
    customPopupContainsHello: (): E2eDriver => {
      cy.get('@alertStub').should('have.been.calledOnceWith', 'Hello');
      return this;
    },
  };

  private getCanvas(): Cypress.Chainable<any> {
    return cy.get('canvas.maplibregl-canvas').its(0).should('not.be.undefined');
  }

  private toImageBitmapBuffer(canvas: HTMLCanvasElement) {
    const base64 = canvas.toDataURL('image/png').replace(/data:.*;base64,/, '');
    const buff = Cypress.Buffer.from(base64, 'base64');
    const png = PNG.sync.read(buff as any);
    return png.data;
  }

  private initReferenceImage() {
    return this.getCanvas().then((mapCanvas) => {
      this.width = mapCanvas.width;
      this.height = mapCanvas.height;
      this.referenceImageBuffer = this.toImageBitmapBuffer(mapCanvas);
    });
  }

  // Yields the number of pixels that differ from the snapshot
  private compareToReference() {
    return this.getCanvas()
      .then((mapCanvas) => {
        cy.wrap({
          pixels: pixelmatch(
            this.referenceImageBuffer,
            this.toImageBitmapBuffer(mapCanvas),
            null,
            this.width,
            this.height
          ),
        });
      })
      .its('pixels')
      .should('not.be.undefined');
  }
}
