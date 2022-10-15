import pixelmatch from 'pixelmatch';
import { E2eDriver } from './driver';

describe('Zoomto Linestring', () => {
  const driver = new E2eDriver();

  it('should zoom to linestring', () => {
    cy.visit('/demo/zoomto-linestring');
    cy.get('canvas');
    cy.wait(2000);
    driver.initReferenceImage();
    cy.get('.zoom-button').click();
    cy.wait(4000);
    driver.compareToReference().should('be.greaterThan', 0);
  });
});
