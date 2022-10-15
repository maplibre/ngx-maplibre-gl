import pixelmatch from 'pixelmatch';
import { E2eDriver } from './driver';

describe('Live update feature', () => {
  const driver = new E2eDriver();
  it('should move the map', () => {
    cy.visit('/demo/live-update-feature');
    cy.get('canvas').should('exist');
    cy.wait(6000);
    driver.storeCanvasHeight();
    driver.storeCanvasWidth();
    driver.addImage();
    cy.wait(700);
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
