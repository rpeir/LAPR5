describe('EditBuildingComponent', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/building/edit');
  });
  it('should edit a building', () => {
    const buildingData = {
      code: "1",
      designation: 'testEdit',
      description: 'test',
      length: 10,
      width: 8,
      height: 5,
    };
    cy.get('[data-cy=code]').click();
    cy.get(`mat-option[id="${buildingData.code}"]`).click(); // Use backticks for template literals
    cy.wait(1000);
    //clear the fields
    cy.get('[data-cy=designation]').clear();
    cy.get('[data-cy=description]').clear();
    cy.get('[data-cy=length]').clear();
    cy.get('[data-cy=width]').clear();
    cy.get('[data-cy=height]').clear();

    //fill the fields

    cy.get('[data-cy=designation]').type(buildingData.designation);
    cy.get('[data-cy=description]').type(buildingData.description);
    cy.get('[data-cy=length]').type(String(buildingData.length));
    cy.get('[data-cy=width]').type(String(buildingData.width));
    cy.get('[data-cy=height]').type(String(buildingData.height));

    cy.intercept({
      method: 'PATCH',
      url: '**/api/buildings'
    }).as('apiCheck');

    cy.get('[data-cy=edit-button]').click();

    cy.wait('@apiCheck').then((interception) => {
      const expectedData = {
        code: buildingData.code,
        designation: buildingData.designation,
        description: buildingData.description,
        length: buildingData.length,
        width: buildingData.width,
        height: buildingData.height,
      };

      assert.deepEqual(interception.request.body, expectedData);
    });
  });
  it('should fail edit building because code is empty', () => {
    // Define building data
    const buildingData = {
      designation: 'testEdit',
      description: 'test',
      length: 10,
      width: 8,
      height: 5,
    };

    // Type data into form fields
    cy.get('[data-cy=designation]').type(buildingData.designation);
    cy.get('[data-cy=description]').type(buildingData.description);
    cy.get('[data-cy=length]').type(String(buildingData.length));
    cy.get('[data-cy=width]').type(String(buildingData.width));
    cy.get('[data-cy=height]').type(String(buildingData.height));

    // Intercept PATCH request to buildings endpoint
    cy.intercept({
      method: 'PATCH',
      url: '**/api/buildings',
    }).as('buildingEdit');

    // Click on the edit button
    cy.get('[data-cy=edit-button]').click();

    // Wait for the intercepted request and assert the response status code
    cy.wait('@buildingEdit').then((interception) => {
      assert.equal(interception.response.statusCode, 400);
    });
  });
});


