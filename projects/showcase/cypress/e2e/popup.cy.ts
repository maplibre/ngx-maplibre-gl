describe('Popup', () => {
  it('should show', () => {
    cy.visit('/demo/popup');
    cy.get('canvas').should('exist');

    cy.get('.maplibregl-popup').within(() => {
      cy.get('.custom-popup-class1').should('exist');
      cy.get('.custom-popup-class2').should('exist');
    });
    cy.get('.maplibregl-popup-content').within(() => {
      cy.get('div').should('have.text', 'Hello world !');
    });
  });
});
