import { loginInTest } from "../../src/helpers/loginTest";

describe('template spec', () => {
  
  it('Visit dashboard and redirect to login', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
  });

  it('Fill inputs on login and not passed auth', () => {
    cy.visit('/');
    cy.get('input[name = user]').type('user');
    cy.get('input[name = password]').type('admin');
    cy.get('button[type = submit]').click();
    cy.url().should('include', '/login');
  });

  it('Fill inputs on login and passed auth', () => {
    cy.visit('/');
    loginInTest();
    cy.url().should('not.include', '/login');
  });

  it('Click button logout and redirect to login', () => {
    cy.visit('/');
    loginInTest();
    cy.get('#test__log-out').click();
    cy.url().should('include', '/login');
  });

})