/// <reference types="cypress" />

describe('Get Booking Test Suite', () => {
  let bookingId;

  beforeEach(() => {
    const bookingPayload = {
      firstname: 'Ana',
      lastname: 'Silva',
      totalprice: 200,
      depositpaid: true,
      bookingdates: {
        checkin: '2024-03-01',
        checkout: '2024-03-05',
      },
      additionalneeds: 'Dinner',
    };

    cy.request({
      method: 'POST',
      url: '/booking',
      body: bookingPayload,
    }).then((response) => {
      expect(response.status).to.eq(200);
      bookingId = response.body.bookingid;
    });
  });

  it('should get an existing booking by id', () => {
    cy.request({
      method: 'GET',
      url: `/booking/${bookingId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.firstname).to.eq('Ana');
      expect(response.body.lastname).to.eq('Silva');
      expect(response.body.totalprice).to.eq(200);
      expect(response.body.depositpaid).to.eq(true);
      expect(response.body.bookingdates).to.deep.equal({
        checkin: '2024-03-01',
        checkout: '2024-03-05',
      });
    });
  });

  it('should return not found for an inexistent booking id', () => {
    cy.request({
      method: 'GET',
      url: '/booking/99999999',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('should get all bookings ids', () => {
    cy.request({
      method: 'GET',
      url: '/booking',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
    });
  });
});
