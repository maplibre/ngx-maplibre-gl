/// <reference types="cypress" />
// Make this test first to allow chrome to load things into memory...?

describe('Custom control', () => {
  it('should show custom control and pop up an alert box', () => {
    cy.visit('/demo/ngx-custom-control');
    cy.get('canvas').should('not.be.null');
    const button = cy.get('.custom-control');
    button.should('have.text', ' Hello ');
    button.click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Hello');
    });
  });
});
