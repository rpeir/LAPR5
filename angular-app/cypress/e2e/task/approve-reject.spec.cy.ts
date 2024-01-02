// cypress/integration/create.spec.ts

describe('PendingRequestsComponent', () => {
  beforeEach(() => {
    // @ts-ignore
    cy.loginTaskManager();
    cy.visit("tasks/pending");
  });

  it('should display pending requests when there are some', () => {
    cy.get('.pending-requests').should('exist');
  });

  it('should be able to accept a pending request', () => {
    // Assuming there is at least one pending request for acceptance.
    cy.get(`button[id=accept]`).first().as('request');
    cy.get('@request').click();

    // intercept the POST request to /api/tasks

    cy.intercept('POST', '/api/tasks').as('postTask');

    cy.get(`[id="select-robot"]`).click().get(`mat-option`).first().click();

    // check if the POST request was sent
    cy.wait('@postTask').then((interception) => {
      expect(interception.response.statusCode).to.equal(201);
    });

  });

  it('should be able to reject a pending request', () => {
    // Assuming there is at least one pending request for acceptance.

    // intercept the DELETE request to /api/taskRequest
    cy.intercept('DELETE', '**/api/taskRequests/**').as('deleteTaskRequest');

    cy.get(`button[id=reject]`).first().as('request');
    cy.get('@request').click();


    // check if the POST request was sent
    cy.wait('@deleteTaskRequest').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

  });
});
