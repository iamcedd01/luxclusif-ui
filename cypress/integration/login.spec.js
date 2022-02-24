/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable cypress/assertion-before-screenshot */
/// <reference types="cypress" />

describe('Login', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('Should render all components', () => {
        cy.get('[data-cy="cs-input-email"]').should('exist');
        cy.get('[data-cy="cs-input-password"]').should('exist');
        cy.get('[data-cy="cs-button-login"]').should('exist');
    });

    it('Should be able to enter email', () => {
        cy.get('[data-cy="cs-input-email"]')
            .find('input')
            .type('sample@email.com')
            .should('have.value', 'sample@email.com');
    });

    it('Should be able to enter password', () => {
        cy.get('[data-cy="cs-input-password"]').find('input').type('password').should('have.value', 'password');
    });

    it('Should not login with empty fields', () => {
        cy.get('[data-cy="cs-button-login"]').click();

        cy.get('[data-cy="cs-input-email"] > [data-cy="error"]').should('have.text', 'Email is required');
        cy.get('[data-cy="cs-input-password"] > [data-cy="error"]').should('have.text', 'Password is required');
    });

    it('Should not login with invalid password', () => {
        cy.get('[data-cy="cs-input-email"]')
            .find('input')
            .type('sample@email.com')
            .should('have.value', 'sample@email.com');

        cy.get('[data-cy="cs-input-password"]').find('input').type('password').should('have.value', 'password');
        cy.get('[data-cy="cs-button-login"]').click();

        cy.get('[data-cy="cs-input-password"] > [data-cy="error"]').should('have.text', "Password doesn't match.");
    });

    it('Should able to login', () => {
        cy.get('[data-cy="cs-input-email"]')
            .find('input')
            .type('sample@email.com')
            .should('have.value', 'sample@email.com');

        cy.get('[data-cy="cs-input-password"]').find('input').type('1234567').should('have.value', '1234567');
        cy.get('[data-cy="cs-button-login"]').click();

        cy.location('pathname').should('eq', '/');
    });
});
