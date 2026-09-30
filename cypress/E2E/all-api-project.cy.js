/// <reference types="cypress" />

describe('Full API Booking Flow', () => {
  let token;
  let bookingId;

  it('should complete the full booking lifecycle with login, create, read, update and delete', () => {
    cy.login('admin', 'password123').then((loginResponse) => {
      expect(loginResponse.status).to.eq(200);
      expect(loginResponse.body.token).to.be.a('string').and.not.empty;
      token = loginResponse.body.token;

      return cy.request({
        method: 'POST',
        url: '/booking',
        body: {
          firstname: 'Flow',
          lastname: 'Test',
          totalprice: 350,
          depositpaid: true,
          bookingdates: {
            checkin: '2024-08-01',
            checkout: '2024-08-05',
          },
          additionalneeds: 'Late checkout',
        },
      });
    }).then((createResponse) => {
      expect(createResponse.status).to.eq(200);
      bookingId = createResponse.body.bookingid;
      expect(bookingId).to.be.a('number');

      return cy.request({
        method: 'GET',
        url: `/booking/${bookingId}`,
      });
    }).then((getResponse) => {
      expect(getResponse.status).to.eq(200);
      expect(getResponse.body.firstname).to.eq('Flow');
      expect(getResponse.body.lastname).to.eq('Test');

      return cy.request({
        method: 'PUT',
        url: `/booking/${bookingId}`,
        headers: {
          Cookie: `token=${token}`,
        },
        body: {
          firstname: 'Updated',
          lastname: 'Flow',
          totalprice: 500,
          depositpaid: false,
          bookingdates: {
            checkin: '2024-09-01',
            checkout: '2024-09-05',
          },
          additionalneeds: 'Airport transfer',
        },
      });
    }).then((updateResponse) => {
      expect(updateResponse.status).to.eq(200);
      expect(updateResponse.body.firstname).to.eq('Updated');
      expect(updateResponse.body.totalprice).to.eq(500);

      return cy.request({
        method: 'DELETE',
        url: `/booking/${bookingId}`,
        headers: {
          Cookie: `token=${token}`,
        },
        failOnStatusCode: false,
      });
    }).then((deleteResponse) => {
      expect(deleteResponse.status).to.eq(201);
    });
  });
});
