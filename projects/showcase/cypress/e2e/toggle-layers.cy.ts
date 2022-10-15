import { E2eDriver } from './driver';

describe('Toggle layers', () => {
  const driver = new E2eDriver();
  it('should toggle layers', () => {
    cy.visit('/demo/toggle-layers');
    cy.get('canvas').should('exist');
    cy.wait(10000);
    driver.initReferenceImage();
    cy.get('mat-button-toggle').contains('countries names').click();
    cy.wait(6000);
    driver.compareToReference().should('be.greaterThan', 0);
    cy.get('mat-button-toggle').contains('countries names').click();
    cy.wait(6000);
    driver.compareToReference().should('equal', 0);
  });
});
