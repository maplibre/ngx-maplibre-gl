import { E2eDriver } from './driver';

describe('Set style', () => {
  const driver = new E2eDriver();
  it('should change the style', () => {
    let orig = console.warn;
    console.warn = () => {};
    cy.visit('/demo/set-style');
    cy.get('canvas').should('exist');
    cy.wait(9000);
    driver.initReferenceImage();
    cy.get('mat-radio-button').contains('from code').click();
    cy.wait(3000);
    driver.compareToReference().should('be.greaterThan', 0);
    cy.get('mat-radio-button').contains('streets').click();
    cy.wait(9000);
    driver.compareToReference().should('equal', 0);
    console.warn = orig;
  });
});
