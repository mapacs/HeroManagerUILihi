/// <reference types="cypress" />

const heroName = `Cypress Hero ${Date.now()}`;

describe('Hero creation modal', () => {
  it('creates a hero and displays it in the list', () => {
    cy.intercept('POST', `${Cypress.env('apiUrl')}/heroes`).as('saveHero');

    cy.visit('/');

    cy.get('[data-cy=add-hero-button]').click();
    cy.get('[data-cy=hero-modal]').should('be.visible');

    cy.get('[data-cy=input-name]').type(heroName);
    cy.get('[data-cy=input-suit-color]').type('green');
    cy.get('[data-cy=checkbox-has-cape]').check();

    cy.get('[data-cy=submit-button]').click();

    cy.wait('@saveHero').its('response.statusCode').should('eq', 201);

    cy.get('[data-cy=hero-modal]').should('not.exist');

    cy.visit('/');
    
    cy.contains(heroName, { timeout: 8000 }).should('be.visible');
  });
});
