// cypress/integration/create.spec.ts

describe('SearchRequestsComponent', () => {
  beforeEach(() => {
    // @ts-ignore
    cy.loginTaskManager();
    cy.visit("taskRequests/search");
    cy.viewport(1920, 1080)
  });

  it('should display requests when there are some', () => {
    cy.get('#table-search').should('exist');
  });

  it('should search for requests with filters', () => {
    // Assuming that some requests exist in the database

    // Type a search query
    cy.get('#select-status').click().get('mat-option[id=approved]').click();
    cy.get('#select-robot-type').click().get('mat-option[id=RobotTypeA]').click();

    // get the number of requests before the search
    cy.get('mat-row').then((rows) => {
      const numberOfRequestsBeforeSearch = rows.length;
      // Click search
      cy.get('#search-button').click();
      // get the number of requests after the search
      cy.get('mat-row').then((rows) => {
        const numberOfRequestsAfterSearch = rows.length;
        // Assert that the table displays the requests with the given filters
        expect(numberOfRequestsAfterSearch).to.be.lessThan(numberOfRequestsBeforeSearch);
      });
    });
  });

  it('should search for requests with dates', () => {
    // Assuming that some requests exist in the database

    // Type a search query
    cy.get('#select-start-date').click();
    cy.get('input[placeholder="Start date"]').type('1/1/2034');
    cy.get('input[placeholder="End date"]').type('1/1/2035');

    // intercept the GET request to /api/taskRequests
    cy.intercept('GET', '**/api/taskRequests**').as('getTaskRequests');

    // Click search
    cy.get('#search-button').click();

    // check if the number of requests is 0
    cy.wait('@getTaskRequests').then((interception) => {
      // check if the status code is 200 or 304
      // it can be 304 if the response is cached
      expect(interception.response.statusCode).to.be.oneOf([200, 304]);
      expect(interception.response.body.length).to.equal(0);
    });
  });
});
