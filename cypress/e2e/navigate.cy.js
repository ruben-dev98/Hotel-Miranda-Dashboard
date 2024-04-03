import { loginInTest } from "../helpers/loginTest"

describe('Navigate with NavLinks', () => {
  
  it('Click on dashboard and visit dashboard page', () => {
    cy.visit('/')
    loginInTest();
    cy.get('nav > a').eq(0).click();
    cy.get('#title').should('contain', 'Dashboard');
  });

  it('Click on bookings and visit bookings page', () => {
    cy.visit('/')
    loginInTest();
    cy.get('nav > a').eq(1).click();
    cy.get('#title').should('contain', 'Bookings');
  });

  it('Click on rooms and visit rooms page', () => {
    cy.visit('/')
    loginInTest();
    cy.get('nav > a').eq(2).click();
    cy.get('#title').should('contain', 'Rooms');
  });

  it('Click on users and visit employees page', () => {
    cy.visit('/')
    loginInTest();
    cy.get('nav > a').eq(3).click();
    cy.get('#title').should('contain', 'Employees');
  });

  it('Click on contact and visit messages page', () => {
    cy.visit('/')
    loginInTest();
    cy.get('nav > a').eq(4).click();
    cy.get('#title').should('contain', 'Messages');
  });

})