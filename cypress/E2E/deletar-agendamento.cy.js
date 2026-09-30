/// <reference types="cypress" />

describe('Delete Appointment Test Suite', () => {

    let token = "f65511f1568b0e4";

    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/auth',
            body: {
                username: "admin",
                password: "password123",
            }
        }).then((response) => {
            token = response;
        });
    });

    it('should delete an appointment with authentication', () => {
        //request to the delete appointment endpoint without authentication
        cy.request({
            method: "DELETE",
            url: "/booking/10",
            headers: {
                cookie: `token=${token}`,
            },
            failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status codes
        }).then((response) => {
            expect(response.status).to.equal(201);
        });
    });

    it('should not delete an appointment without authentication', () => {
        //request to the delete appointment endpoint without authentication
        cy.request({
            method: "DELETE",
            url: "/booking/1171",
            failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status codes
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });
})