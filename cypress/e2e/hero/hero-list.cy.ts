/// <reference types="cypress" />

import { Hero } from "@app/models/hero";

describe('Hero list', () => {
    it('should render all heroes with correct values from API', () => {
        cy.intercept('GET', `${Cypress.env('apiUrl')}/heroes`).as('getHeroes');
        
        cy.visit('/');

        cy.wait('@getHeroes').then(({ response }) => {
            const heroes = response?.body;
            expect(heroes).to.exist;

            heroes.forEach((hero: Hero) => {
                cy.get(`[data-cy="hero-item-${hero.id}"]`).should('exist').within(() => {
                    cy.get(`[data-cy="hero-name-${hero.id}"]`).should('contain.text', hero.name);
                    cy.get(`[data-cy="hero-suit-color-${hero.id}"]`).should('contain.text', hero.suitColor);
                    
                    if (hero.hasCape) {
                        cy.get(`[data-cy="hero-has-cape-${hero.id}"]`).should('be.visible');
                        cy.get(`[data-cy="hero-no-cape-${hero.id}"]`).should('not.exist');
                    } else {
                        cy.get(`[data-cy="hero-no-cape-${hero.id}"]`).should('be.visible');
                        cy.get(`[data-cy="hero-has-cape-${hero.id}"]`).should('not.exist');
                    }
                });
            });
        });
    });
});
