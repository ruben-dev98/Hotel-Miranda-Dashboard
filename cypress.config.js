import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://192.168.1.133:5173',
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
