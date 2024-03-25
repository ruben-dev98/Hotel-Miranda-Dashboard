export const loginInTest = () => {
    cy.get('input[name = user]');
    cy.get('input[name = password]')
    cy.get('button[type = submit]').click();
}