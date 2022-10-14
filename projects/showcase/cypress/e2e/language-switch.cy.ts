import pixelmatch from 'pixelmatch';
import { E2eDriver } from './driver';

describe('Language switch', () => {
  let driver = new E2eDriver();
  it('should change language', () => {
    cy.visit('/demo/language-switch');
    cy.wait(2000); // wait for map to load
    cy.get('.lang-button').contains('French').click();
    cy.wait(4000); // wait for language to change
    driver.storeCanvasWidth();
    driver.storeCanvasHeight();
    driver.addImage();
    cy.get('.lang-button').contains('Russian').click();
    cy.wait(4000); // wait for language to change
    cy.get('canvas')
      .then((c) => {
        return pixelmatch(
          driver.getImageBitmapBuffer(),
          driver.toImageBitmapBuffer(c[0]),
          null,
          driver.width,
          driver.height
        );
      })
      .should('be.greaterThan', 0);
    cy.get('.lang-button').contains('French').click();
    cy.wait(4000); // wait for language to change
    cy.get('canvas')
      .then((c) => {
        return pixelmatch(
          driver.getImageBitmapBuffer(),
          driver.toImageBitmapBuffer(c[0]),
          null,
          driver.width,
          driver.height
        );
      })
      .should('equal', 0);
  });
});
