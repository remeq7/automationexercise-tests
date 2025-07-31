import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://automationexercise.com",
    testIsolation: false,
    setupNodeEvents(on, config) {
      // config here
    },
  },
});
