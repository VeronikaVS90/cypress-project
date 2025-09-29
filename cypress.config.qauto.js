const { defineConfig } = require("cypress");
const baseConfig = require("./cypress.config");

module.exports = defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: "https://guest:welcome2qauto@qauto.forstudy.space/",
    env: {
      email: "jamesdean@gmail.com",
      password: "Testjames123",
    },

    excludeSpecPattern: ["**/garageApi.cy.js"],

    setupNodeEvents(on, config) {
      if (baseConfig.e2e && typeof baseConfig.e2e.setupNodeEvents === "function") {
        baseConfig.e2e.setupNodeEvents(on, config);
      }
      return config;
    },
  },
});


