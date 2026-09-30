// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/// <reference types="cypress" />
Cypress.Commands.add('login', (username, password) => {
    //request to the login endpoint with valid credentials
    cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/auth',
        body: {
            username: username,
            password: password,
        }
    }).then((response) => {
        // expect(response.status).to.eq(200);
        // expect(response.body.token).to.not.empty;
        return response;
    });
});