const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/E2E/**/*.cy.js',
    baseUrl: 'https://restful-booker.herokuapp.com',
    setupNodeEvents(on, config) {
      
      
      // implement node event listeners here
    },
  },
});
