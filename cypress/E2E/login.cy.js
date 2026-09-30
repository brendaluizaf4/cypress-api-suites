/// <reference types="cypress" />

describe('Login', () => {

  it('should log in successfully with valid credentials', () => {
    //request to the login endpoint with valid credentials
    cy.login('admin', 'password123').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.token).to.not.empty;
      });
    })


    it('should not log with invalid password', () => {
      //request to the login endpoint with invalid credentials
      cy.login('admin', 'wrongpassword').then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.reason).to.eq('Bad credentials');
        });
    });

    it('should not log in with wrong username', () => {
      //request to the login endpoint with invalid credentials
      cy.login('wrongusername', 'password123').then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.reason).to.eq('Bad credentials');
        });
    });
  });