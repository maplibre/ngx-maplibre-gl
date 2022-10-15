import { E2eDriver } from './driver';

describe('Language switch', () => {
  let driver = new E2eDriver();
  it('should change language', () => {
    cy.visit('/demo/language-switch');
    cy.wait(2000); // wait for map to load
    cy.get('.lang-button').contains('French').click();
    cy.wait(4000); // wait for language to change
    driver.initReferenceImage();
    cy.get('.lang-button').contains('Russian').click();
    cy.wait(4000); // wait for language to change
    driver.compareToReference().should('be.greaterThan', 0);
    cy.get('.lang-button').contains('French').click();
    cy.wait(4000); // wait for language to change
    driver.compareToReference().should('equal', 0);
  });
});
