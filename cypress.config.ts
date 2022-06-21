import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    pageLoadTimeout: 100 * 1000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
