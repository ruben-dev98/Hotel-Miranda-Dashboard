describe('template spec', () => {
  it('Visit ', () => {
    cy.visit('/');
    cy.url('/login');
  })
})