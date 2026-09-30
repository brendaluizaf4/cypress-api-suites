/// <reference types="cypress" />

describe('Delete Appointment Test Suite', () => {
    let token;

    beforeEach(() => {
        cy.login('admin', 'password123').then((response) => {
            token = response.body.token;
        });
    });

    it('should delete an appointment with authentication', () => {
        cy.request({
            method: 'DELETE',
            url: '/booking/24',
            headers: {
                Cookie: `token=${token}`,
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(201);
        });
    });

    it('should not delete an appointment without authentication', () => {
        cy.request({
            method: 'DELETE',
            url: '/booking/999',
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(403);
        });
    });
});