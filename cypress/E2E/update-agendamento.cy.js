/// <reference types="cypress" />

describe('Update Booking Test Suite', () => {
  let bookingId;
  let token;

  beforeEach(() => {
    cy.login('admin', 'password123').then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.token;
    });

    cy.request({
      method: 'POST',
      url: '/booking',
      body: {
        firstname: 'Bruce',
        lastname: 'Wayne',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
          checkin: '2024-04-01',
          checkout: '2024-04-05',
        },
        additionalneeds: 'Room service',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      bookingId = response.body.bookingid;
    });
  });

  it('should update an existing booking with a valid token', () => {
    const updatedBooking = {
      firstname: 'Batman',
      lastname: 'Wayne',
      totalprice: 300,
      depositpaid: false,
      bookingdates: {
        checkin: '2024-05-01',
        checkout: '2024-05-07',
      },
      additionalneeds: 'Breakfast and parking',
    };

    cy.request({
      method: 'PUT',
      url: `/booking/${bookingId}`,
      headers: {
        Cookie: `token=${token}`,
      },
      body: updatedBooking,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.firstname).to.eq('Batman');
      expect(response.body.lastname).to.eq('Wayne');
      expect(response.body.totalprice).to.eq(300);
      expect(response.body.depositpaid).to.eq(false);
      expect(response.body.additionalneeds).to.eq('Breakfast and parking');
    });
  });

  it('should not update a booking without authentication', () => {
    cy.request({
      method: 'PUT',
      url: `/booking/${bookingId}`,
      body: {
        firstname: 'No Auth',
        lastname: 'User',
        totalprice: 100,
        depositpaid: true,
        bookingdates: {
          checkin: '2024-06-01',
          checkout: '2024-06-03',
        },
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });

  it('should not update a booking with an invalid token', () => {
    cy.request({
      method: 'PUT',
      url: `/booking/${bookingId}`,
      headers: {
        Cookie: 'token=invalid-token',
      },
      body: {
        firstname: 'Invalid',
        lastname: 'Token',
        totalprice: 100,
        depositpaid: true,
        bookingdates: {
          checkin: '2024-07-01',
          checkout: '2024-07-03',
        },
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
});
