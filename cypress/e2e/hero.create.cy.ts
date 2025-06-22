/// <reference types="cypress" />

const heroName = `Cypress Hero ${Date.now()}`;

describe('Hero creation modal', () => {
  it('creates a hero and displays it in the list', () => {
    cy.intercept('POST', `${Cypress.env('apiUrl')}/heroes`).as('saveHero');

    cy.visit('/');

    cy.contains('+ Add Hero').click();
    cy.get('.modal-dialog').should('be.visible');

    cy.get('input[formcontrolname="name"]').type(heroName);
    cy.get('input[formcontrolname="suit_color"]').type('green');
    cy.get('input[formcontrolname="has_cape"]').check();

    cy.contains('button', 'Save').click();

    cy.wait('@saveHero')
      .its('response.statusCode')
      .should('eq', 201);

    cy.get('.modal-dialog').should('not.exist');

    cy.contains(heroName).should('be.visible');
  });
});
