import { v4 as uuid } from 'uuid';

/// <reference types="cypress" />

const heroStub = {
  id: Math.floor(Math.random() * 10_000),
  name: `Hero ${uuid().slice(0, 6)}`,
  suitColor: 'green',
  hasCape: true,
  isRetired: false,
  lastMission: null,
};

describe('Hero create modal', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy="add-hero-button"]').should('be.visible').and('not.be.disabled').click();
    cy.get('[data-cy="hero-create-modal"]').should('be.visible');
  });

  after(() => {
    cy.get('[data-cy="cancel-create-hero-button"]').should('be.visible').and('not.be.disabled').click();
  })

  it('enables Save when form is valid', () => {
    cy.get('[data-cy="input-hero-name"]').should('be.visible').type(heroStub.name);
    cy.get('[data-cy="input-hero-suit-color"]').should('be.visible').type(heroStub.suitColor);
    cy.get('[data-cy="checkbox-hero-has-cape"]').should('be.visible').check();
    cy.get('[data-cy="submit-create-hero-button"]').should('be.visible').and('not.be.disabled');
  });

  it('disables Save when form is invalid', () => {
    cy.get('[data-cy="submit-create-hero-button"]').should('be.disabled');
  });
});
