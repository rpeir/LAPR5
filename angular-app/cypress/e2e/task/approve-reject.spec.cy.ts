// cypress/integration/create.spec.ts

describe('PendingRequestsComponent', () => {
  beforeEach(() => {
    cy.visit("tasks/pending");
  });

  let requestId1: string;
  let requestId2: string;

  it('should display pending requests when there are some', () => {
    cy.get('.pending-requests').should('exist');
  });

  it('should be able to accept a pending request', () => {
    // Assuming there is at least one pending request for acceptance.
    cy.get(`[id="${requestId1}"]`).first().as('request');
    cy.get('@request').find('button[color="primary"]').click();

    // intercept the POST request to /api/tasks

    cy.intercept('POST', '/api/tasks').as('postTask');

    cy.get(`[id="select-robot"]`).click().get(`mat-option`).first().click();

    // check if the POST request was sent
    cy.wait('@postTask').then((interception) => {
      expect(interception.response.statusCode).to.equal(201);
    });

  });

  it('should be able to reject a pending request', () => {
    // Assuming there is at least one pending request for rejection.
    cy.get(`[id="${requestId2}"]`).first().as('request');
    cy.get('@request').find('button[color="warn"]').click();

    // intercept the POST request to /api/tasks

    cy.intercept('DELETE', '/api/tasksRequests').as('delete');

    // check if the POST request was sent
    cy.wait('@delete').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

  });
});
