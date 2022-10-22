/// <reference types="cypress" />
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

export class E2eDriver {
  private width: number;
  private height: number;
  private referenceImageBuffer: Buffer;

  given = {};

  when = {
    visit: (url: string): E2eDriver => {
      cy.visit(url);
      return this;
    },
    wait: (ms: number): E2eDriver => {
      cy.wait(ms);
      return this;
    },
    waitForLanguageToChange: (): E2eDriver => this.when.wait(7000),
    clickLanguageButton: (language: string): E2eDriver => {
      cy.get('.lang-button').contains(language).click();
      return this;
    },
    takeImageSnapshot: (): E2eDriver => {
      this.initReferenceImage();
      return this;
    },
  };

  get = {
    isCurrentImageEqualToSnapshot: () => this.compareToReference(),
  };

  private toImageBitmapBuffer(canvas: HTMLCanvasElement) {
    const base64 = canvas.toDataURL('image/png').replace(/data:.*;base64,/, '');
    const buff = Cypress.Buffer.from(base64, 'base64');
    const png = PNG.sync.read(buff as any);
    return png.data;
  }

  private initReferenceImage() {
    return cy
      .get('canvas')
      .then((c) => {
        this.width = c[0].width;
        this.height = c[0].height;
        this.referenceImageBuffer = this.toImageBitmapBuffer(c[0]);
      })
      .should('not.be.null');
  }

  private compareToReference() {
    return cy.get('canvas').then((c) => {
      return pixelmatch(
        this.referenceImageBuffer,
        this.toImageBitmapBuffer(c[0]),
        null,
        this.width,
        this.height
      );
    });
  }
}
