/// <reference types="cypress" />

describe('Create Booking Test Suite', () => {
  const bookingPayload = {
    firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2024-01-01',
      checkout: '2024-01-05',
    },
    additionalneeds: 'Breakfast',
  };

  it('should create a booking successfully with valid data', () => {
    cy.request({
      method: 'POST',
      url: '/booking',
      body: bookingPayload,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.bookingid).to.be.a('number');
      expect(response.body.booking).to.deep.include({
        firstname: 'Jim',
        lastname: 'Brown',
        totalprice: 111,
        depositpaid: true,
        additionalneeds: 'Breakfast',
      });
      expect(response.body.booking.bookingdates).to.deep.equal({
        checkin: '2024-01-01',
        checkout: '2024-01-05',
      });
    });
  });

  it('should create a booking with only required fields', () => {
    const minimalPayload = {
      firstname: 'Mary',
      lastname: 'Jane',
      totalprice: 50,
      depositpaid: false,
      bookingdates: {
        checkin: '2024-02-01',
        checkout: '2024-02-03',
      },
    };

    cy.request({
      method: 'POST',
      url: '/booking',
      body: minimalPayload,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.bookingid).to.be.a('number');
      expect(response.body.booking.firstname).to.eq('Mary');
      expect(response.body.booking.lastname).to.eq('Jane');
    });
  });

  it('should return an error when the payload is invalid', () => {
    cy.request({
      method: 'POST',
      url: '/booking',
      body: {
        firstname: '',
        lastname: '',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 500]);
    });
  });
});
