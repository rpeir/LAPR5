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
      "cypress/e2e/userRequest/*.ts",
      "cypress/e2e/sysadm/*.ts",
      "cypress/e2e/manager/*.ts",
      "cypress/e2e/account/*.ts",
      //...
    ],
    env: {
      TASK_MANAGER_EMAIL: "taskmanager@isep.ipp.pt",
      TASK_MANAGER_PASSWORD: "Sapo--1234",
      CAMPUS_MANAGER_EMAIL: "campusmanager@isep.ipp.pt",
      CAMPUS_MANAGER_PASSWORD: "Sapo--1234",
      FLEET_MANAGER_EMAIL: "fleetmanager@isep.ipp.pt",
      FLEET_MANAGER_PASSWORD: "Sapo--1234",
      USER_EMAIL: "1210123@isep.ipp.pt",
      USER_PASSWORD: "Sapo--1234",
      ADMIN_EMAIL: "sysadmin@isep.ipp.pt",
      ADMIN_PASSWORD: "Sapo--1234",
      API_BASE_URL: "http://localhost:4000",
    }
  },
});
