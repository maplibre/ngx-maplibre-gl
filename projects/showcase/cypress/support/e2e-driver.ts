/// <reference types="cypress" />
import Sinon from 'cypress/types/sinon';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

export class E2eDriver {
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
    return this;
  };

  // Used to reset the console.warn spy for cases when it is known that warnings have been
  // logged so that the test will not fail (the spy is first defined in commands.ts and
  // warnings are evaluated as failures in afterEach())
  resetConsoleWarnings = (): E2eDriver => {
    cy.get('@consoleWarnSpy').then((spy: any) => {
      if (spy.callCount > 0) {
        cy.log(`Clearing ${spy.callCount} console warning(s)...`);
        spy.resetHistory();
      }
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
      cy.get('[data-idle="true"]', { timeout: timeout }).should('exist');
      return this;
    },
    waitForMapLoaded: (timeout: number = 30000): E2eDriver => {
      cy.get('[data-loaded="true"]', { timeout: timeout }).should('exist');
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
    clickEnableTerrainControlButton: (): E2eDriver => {
      cy.get('.maplibregl-ctrl-terrain').click();
      return this;
    },
    clickDisableTerrainControlButton: (): E2eDriver => {
      cy.get('.maplibregl-ctrl-terrain-enabled').click();
      return this;
    },
    clickHideControlsButton: (): E2eDriver => {
      cy.get('button').contains('Hide Controls').click();
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
      cy.get('[data-loaded="true"]').should('exist');
      return this;
    },
    mapTerrainButtonIsOff: (): E2eDriver => {
      cy.get('.maplibregl-ctrl-terrain').should('exist');
      return this;
    },
    mapTerrainButtonIsOn: (): E2eDriver => {
      cy.get('.maplibregl-ctrl-terrain-enabled').should('exist');
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
    customHelloButtonDoesNotExist: (): E2eDriver => {
      cy.get('.custom-control').should('not.exist');
      return this;
    },
    fullscreenControlExists: (): E2eDriver => {
      cy.get('.maplibregl-ctrl-fullscreen').should('exist');
      return this;
    },
    fullscreenControlDoesNotExist: (): E2eDriver => {
      cy.get('.maplibregl-ctrl-fullscreen').should('not.exist');
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
