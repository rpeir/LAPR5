describe('Replace Elevator spec', () => {
  beforeEach(() => {
    cy.visit('elevator/replace'); // Assuming '/create' is the route for your CreateComponent
  });
  it('should create a elevator because it does not exist', () => {
    const elevatorData = {
      id: "1",
      designation: 'ElevTestB',
      buildingDesignation: 'B',
      floorsServed: ["1"],
      brand: 'test',
      modelE: 'test',
      serialNumber: 'test',
      description: 'test',
    };
    cy.get('[data-cy=id]').type(elevatorData.id);

    cy.get('[data-cy=designation]').type(elevatorData.designation);
    // Click to open the building designation dropdown
    cy.get('[data-cy=buildingDesignation]').click();
    // Select the building designation from the dropdown
    cy.get(`mat-option[id="${elevatorData.buildingDesignation}"]`).click();
    cy.wait(1000);
    // Click to open the floors served dropdown
    cy.get('[data-cy=floorsServed]').click();
    // Select the floors served from the dropdown
    elevatorData.floorsServed.forEach(floor => {
      cy.get(`mat-option`).contains(floor).click();
    });
    cy.get('body').first().type('{esc}').type('{esc}').type('{esc}'); // Close the dropdowns (2x esc
    cy.get('[data-cy=brand]').click().type(elevatorData.brand);
    cy.get('[data-cy=modelE]').type(elevatorData.modelE);
    cy.get('[data-cy=serialNumber]').type(elevatorData.serialNumber);
    // Check if the elevator is created successfully
    cy.intercept({
      method: 'PUT',
      url: '**/api/elevators'
    }).as('apiCheck')
    cy.get('[data-cy=description]').type(elevatorData.description).type('{enter}');

    cy.wait('@apiCheck').then((interception) => {
      assert.equal(JSON.stringify({
        ...interception.response.body,
        code: undefined,
      }), JSON.stringify(elevatorData));
    })
  });

  it('should replace a elevator', () => {
    const elevatorData = {
      id: "1",
      designation: 'NovoElevTest',
      buildingDesignation: 'B',
      floorsServed: [1],
      brand: 'test',
      modelE: 'test',
      serialNumber: 'test',
      description: 'test',
    };
    cy.get('[data-cy=id]').type(elevatorData.id);

    cy.get('[data-cy=designation]').type(elevatorData.designation);
    // Click to open the building designation dropdown
    cy.get('[data-cy=buildingDesignation]').click();
    // Select the building designation from the dropdown
    cy.get(`mat-option[id="${elevatorData.buildingDesignation}"]`).click();
    cy.wait(1000);
    // Click to open the floors served dropdown
    cy.get('[data-cy=floorsServed]').click();
    // Select the floors served from the dropdown
    elevatorData.floorsServed.forEach(floor => {
      cy.get(`mat-option`).contains(floor).click();
    });
    cy.get('body').first().type('{esc}').type('{esc}').type('{esc}'); // Close the dropdowns (2x esc
    cy.get('[data-cy=brand]').click().type(elevatorData.brand);
    cy.get('[data-cy=modelE]').type(elevatorData.modelE);
    cy.get('[data-cy=serialNumber]').type(elevatorData.serialNumber);
    // Check if the elevator is created successfully
    cy.intercept({
      method: 'PUT',
      url: '**/api/elevators'
    }).as('apiCheck')
    cy.get('[data-cy=description]').type(elevatorData.description).type('{enter}');

    cy.wait('@apiCheck').then((interception) => {
      assert.equal(JSON.stringify({
        ...interception.response.body,
        code: undefined,
      }), JSON.stringify(elevatorData));
    })
  });
  it('should fail replace elevator because id is empty', () => {
    const elevatorData = {
      designation: 'ElevTest3',
      buildingDesignation: 'B', // Replace this with the actual building designation you want to select
      floorsServed: [1], // Replace this with an array of floor numbers you want to select
      brand: 'test',
      modelE: 'test',
      serialNumber: 'test',
      description: 'test',
    };
    cy.get('[data-cy=designation]').type(elevatorData.designation);
    // Click to open the building designation dropdown
    cy.get('[data-cy=buildingDesignation]').click();
    // Select the building designation from the dropdown
    cy.get(`mat-option[id="${elevatorData.buildingDesignation}"]`).click();
    cy.wait(1000);
    // Click to open the floors served dropdown
    cy.get('[data-cy=floorsServed]').click();
    // Select the floors served from the dropdown
    elevatorData.floorsServed.forEach(floor => {
      cy.get(`mat-option`).contains(floor).click();
    });
    cy.get('body').first().type('{esc}').type('{esc}').type('{esc}'); // Close the dropdowns (2x esc
    cy.get('[data-cy=brand]').click().type(elevatorData.brand);
    cy.get('[data-cy=modelE]').type(elevatorData.modelE);
    cy.get('[data-cy=serialNumber]').type(elevatorData.serialNumber);

    cy.intercept({
      method: 'PUT',
      url: '**/api/elevators'
    }).as('apiCheck')
    cy.get('[data-cy=description]').type(elevatorData.description).type('{enter}');
    cy.wait('@apiCheck').then((interception) => {
      assert.equal('{"error":"Bad Request","message":"\\"id\\" is required"}', JSON.stringify(interception.response.body));
    })
  });
});
