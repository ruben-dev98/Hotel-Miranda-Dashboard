describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:5173');
    cy.url('http://192.168.1.133:5173/login')
  })
})