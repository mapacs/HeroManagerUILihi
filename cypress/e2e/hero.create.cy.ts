import { v4 as uuid } from 'uuid';
/// <reference types="cypress" />

const heroName = `Hero ${uuid()}`;

describe('Hero creation modal', () => {
  it('creates a hero and displays it in the list', () => {
    cy.intercept('POST', `${Cypress.env('apiUrl')}/heroes`).as('saveHero');

    cy.visit('/');

    cy.get('[data-cy="add-hero-button"]').click();
    cy.get('[data-cy="hero-create-modal"]').should('be.visible');

    cy.get('[data-cy="input-hero-name"]').type(heroName);
    cy.get('[data-cy="input-hero-suit-color"]').type('green');
    cy.get('[data-cy="checkbox-hero-has-cape"]').check();

    cy.get('[data-cy="submit-create-hero-button"]').click();

    cy.wait('@saveHero').then(({ response }) => {
        expect(response?.statusCode).to.eq(201);
        const createdHeroId = response?.body?.id;
        expect(createdHeroId).to.exist;
        
        cy.get('[data-cy="hero-create-modal"]').should('not.exist');

        cy.visit('/');
        
        cy.get(`[data-cy="hero-name-${createdHeroId}"]`).should('contain', heroName);        
    });
  });
});
