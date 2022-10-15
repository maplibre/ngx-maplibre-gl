import { E2eDriver } from './driver';

describe('Live update feature', () => {
  const driver = new E2eDriver();
  it('should move the map', () => {
    cy.visit('/demo/live-update-feature');
    cy.get('canvas').should('exist');
    cy.wait(6000);
    driver.initReferenceImage();
    cy.wait(700);
    driver.compareToReference().should('be.greaterThan', 0);
  });
});
