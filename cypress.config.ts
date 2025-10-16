import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:4200",
    viewportHeight: 768,
    viewportWidth: 1024,
    defaultCommandTimeout: 4000,

    env: {
      apiBaseUrl: "http://localhost:3000",
    },
  },
});
