/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import AUTWindow = Cypress.AUTWindow;
import Chainable = Cypress.Chainable;
import VisitOptions = Cypress.VisitOptions;

Cypress.Commands.addAll({
  loginTaskManager(
    path?: string,
    options?: VisitOptions,
  ): Chainable<AUTWindow> {
    return login(Cypress.env("TASK_MANAGER_EMAIL"), Cypress.env("TASK_MANAGER_PASSWORD"), path, options);
  },
  loginFleetManager(
    path?: string,
    options?: VisitOptions,
  ): Chainable<AUTWindow> {
    return login(Cypress.env("FLEET_MANAGER_EMAIL"), Cypress.env("FLEET_MANAGER_PASSWORD"), path, options);
  },
  loginAdmin(
    path?: string,
    options?: VisitOptions,
  ): Chainable<AUTWindow> {
    return login(Cypress.env("ADMIN_EMAIL"), Cypress.env("ADMIN_PASSWORD"), path, options);
  },
  loginUser(
    path?: string,
    options?: VisitOptions,
  ): Chainable<AUTWindow> {
    return login(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"), path, options);
  },
  loginCampusManager(
    path?: string,
    options?: VisitOptions,
  ): Chainable<AUTWindow> {
    return login(Cypress.env("CAMPUS_MANAGER_EMAIL"), Cypress.env("CAMPUS_MANAGER_PASSWORD"), path, options);
  }
});

function login(email: string, password: string, path?: string, visitOptions?: VisitOptions) : Chainable<AUTWindow> {
  const options = {
    method: "POST",
    url: "http://localhost:4000/api/auth/signin",
    body: {
      email: email,
      password: password,
    },
    // Restrict cypress from showing errored response by default.
    // It would dump the whole request object, including env values.
    failOnStatusCode: false,
  };

  return cy.request(options).then((response) => {
    if (response.status !== 200) {
      throw new Error(
        `Request to get auth token failed, response: ${JSON.stringify(
          response.body,
        )}`,
      );
    }

    const token = response.body.token;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(response.body.userDTO));

    // Assuming AUTWindow is a type representing your application's window.
    // Adjust it based on your actual application structure.
    return cy.visit(path || "/", {
      headers: { Authorization: `Bearer ${token}` },
      ...visitOptions,
    }) as Chainable<AUTWindow>;
  });
}

