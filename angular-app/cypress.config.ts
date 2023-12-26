import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:4200",
    specPattern: [
      "cypress/e2e/login/*.ts",
      "cypress/e2e/building/*.ts",
      "cypress/e2e/floor/*.ts",
      "cypress/e2e/room/*.ts",
      "cypress/e2e/elevator/*.ts",
      "cypress/e2e/pathway/*.ts",
      "cypress/e2e/robot-type/*.ts",
      "cypress/e2e/robot/*.ts",
      "cypress/e2e/task/*.ts",
      //...
    ]
  },
});
