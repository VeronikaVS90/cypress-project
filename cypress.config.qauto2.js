const { defineConfig } = require("cypress");
const baseConfig = require("./cypress.config");

module.exports = defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: "https://guest:welcome2qauto@qauto2.forstudy.space/",
    env: {
      email: "jackbrown@gmail.com",
      password: "Testjack123",
    },
  },
});

