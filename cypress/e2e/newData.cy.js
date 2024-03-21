import { loginInTest } from "../../src/helpers/loginTest";

describe('Insert New Data', () => {
  
  it('Submit form to create a new Booking', () => {
    cy.visit('/')
    loginInTest();
    cy.get('nav > a').eq(1).click();
    cy.get('.top__menu-table > a').click();
    
    cy.get('input[name=full_name]').type('Ruben D');
    cy.get('input[name=check_in]').type('1998-03-01');
    cy.get('input[name=check_out]').type('1998-03-04');
    cy.get('select[name=number]').select('42');
    cy.get('input[name=email]').type('ruben.dopico.dev@gmail.com');
    cy.get('input[name=phone]').type('000222444');
    cy.get('textarea[name=special_request]').type('Muy buenas me gustaria un mini bar en mi habitacion con solo agua, Gracias.');

    cy.get('button[type=submit]').click().then(() => {
      cy.get('#swal2-html-container').should('contain', 'Successfully');
    });
  });

  it('Submit form to create a new Room', () => {
    cy.visit('/')
    loginInTest();
    cy.get('nav > a').eq(2).click();
    cy.get('.top__menu-table > a').click();

    cy.get('input[name=foto]').type('https://imgupscaler.com/images/samples/animal-after.webp');
    cy.get('select[name=type]').select('Suite');
    cy.get('input[name=number]').type(52);
    cy.get('textarea[name=description]').type('Habitacion con dos baños y cuatro camas, mini bar incluido');
    cy.get('input[name=price]').type(350);
    cy.get('input[name=discount]').type(20);
    cy.get('textarea[name=cancellation]').type('Muy buenas me gustaria un mini bar en mi habitacion con solo agua, Gracias.');
    cy.get('select[name=amenities]').select(['Breakfast', 'Smart Security']);

    cy.get('button[type=submit]').click().then(() => {
      cy.get('#swal2-html-container').should('contain', 'Successfully');
    });
  });

  it('Submit form to create a new Employee', () => {
    cy.visit('/')
    loginInTest();
    cy.get('nav > a').eq(3).click();
    cy.get('.top__menu-table > a').click();

    cy.get('input[name=foto]').type('https://imgupscaler.com/images/samples/animal-after.webp');
    cy.get('input[name=full_name]').type('Algun Nombre Completo');
    cy.get('select[name=job]').select('Recepción');
    cy.get('input[name=email]').type('algunemail@gmail.com');
    cy.get('input[name=contact]').type('666777888');
    cy.get('input[name=start_date]').type('1998-02-15');
    cy.get('textarea[name=description]').type('Habitacion con dos baños y cuatro camas, mini bar incluido');
    cy.get('select[name=status]').select('Inactivo');
    cy.get('input[name=password]').type('algunacontraseñamuycomplicadaymuysegura');

    cy.get('button[type=submit]').click().then(() => {
      cy.get('#swal2-html-container').should('contain', 'Successfully');
    });
  });

})