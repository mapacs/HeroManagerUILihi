import { v4 as uuid } from 'uuid';

/// <reference types="cypress" />

const heroStub = {
  id: Math.floor(Math.random() * 10_000),
  name: `Hero ${uuid().slice(0, 6)}`,
  suitColor: 'green',
  hasCape: 1,
  isRetired: false,
  lastMission: null,
};

describe('Hero modal & list', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', `${Cypress.env('apiUrl')}/heroes`, []).as('getHeroes');
    cy.get('[data-cy="add-hero-button"]').should('be.visible').and('not.be.disabled').click();
    cy.get('[data-cy="hero-create-modal"]').should('be.visible');
  });

  it('enables Save when form is valid', () => {
    cy.get('[data-cy="input-hero-name"]').type(heroStub.name);
    cy.get('[data-cy="input-hero-suit-color"]').type(heroStub.suitColor);
    cy.get('[data-cy="checkbox-hero-has-cape"]').check();
  });

  it('disables Save when form is invalid', () => {
    cy.get('[data-cy="submit-create-hero-button"]').should('be.disabled');
  });

  it('creates a hero and updates UI using intercept stub', () => {
    cy.intercept(
        'POST',
        `${Cypress.env('apiUrl')}/heroes`,
        (req) => {
            expect(req.body.name).to.eq(heroStub.name);
            req.reply({
                statusCode: 201,
                body: heroStub,
            });
        }).as('saveHero');
        
        cy.intercept('GET', `${Cypress.env('apiUrl')}/heroes`, [heroStub]).as('getHeroes');

        cy.get('[data-cy="input-hero-name"]').type(heroStub.name);
        cy.get('[data-cy="input-hero-suit-color"]').type(heroStub.suitColor);
        cy.get('[data-cy="checkbox-hero-has-cape"]').check();

        cy.get('[data-cy="submit-create-hero-button"]').should('be.visible').and('not.be.disabled').click();

        cy.visit('/');
        cy.wait('@getHeroes'); 
        
        cy.get('[data-cy="hero-create-modal"]').should('not.exist');
        
        cy.get(`[data-cy="hero-item-${heroStub.id}"]`)
        .should('contain.text', heroStub.name)
        .within(() => {
            cy.get(`[data-cy="hero-suit-color-${heroStub.id}"]`)
            .should('contain', heroStub.suitColor);
            if (heroStub.hasCape) {
                cy.get(`[data-cy="hero-has-cape-${heroStub.id}"]`).should('be.visible');
                cy.get(`[data-cy="hero-no-cape-${heroStub.id}"]`).should('not.exist');
            } else {
                cy.get(`[data-cy="hero-no-cape-${heroStub.id}"]`).should('be.visible');
                cy.get(`[data-cy="hero-has-cape-${heroStub.id}"]`).should('not.exist');
            }
        });
    });
});
