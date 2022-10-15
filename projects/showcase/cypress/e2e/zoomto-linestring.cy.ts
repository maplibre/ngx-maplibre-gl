import pixelmatch from 'pixelmatch';
import { E2eDriver } from './driver';

describe('Zoomto Linestring', () => {
  const driver = new E2eDriver();

  it('should zoom to linestring', () => {
    cy.visit('/demo/zoomto-linestring');
    cy.get('canvas');
    cy.wait(2000);
    driver.storeCanvasHeight();
    driver.storeCanvasWidth();
    driver.addImage();
    cy.get('.zoom-button').click();
    cy.wait(4000);
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
  });
});
