describe('Update elevator spec', () => {
  beforeEach(() => {
    // @ts-ignore
    cy.loginCampusManager();
    cy.visit('elevator/update'); // Assuming '/create' is the route for your CreateComponent
  });
  it('should update a new elevator', () => {
    const elevatorData = {
      designation: 'UpdateElevTest',
      buildingDesignation: 'B', // Replace this with the actual building designation you want to select
      floorsServed: ["1"],
      brand: 'novotest',
      modelE: 'novotest',
      serialNumber: 'novotest',
      description: 'novotest',
    };

    const OLD_DESIGNATION = 'ElevTest';
    const OLD_BUILDING_DESIGNATION = 'A';
    cy.get('[data-cy=buildingSelect]').click().get(`mat-option[id="${OLD_BUILDING_DESIGNATION}"]`).click();
    cy.get('[data-cy=id]').click().get(`mat-option[id="${OLD_DESIGNATION}"]`).click();

    cy.get('[data-cy=designation]').clear().type(elevatorData.designation);
    // Click to open the building designation dropdown
    cy.get('[data-cy=buildingDesignation]').click().get(`mat-option[id="${elevatorData.buildingDesignation}"]`).click();
    cy.wait(1000);
    // Click to open the floors served dropdown
    cy.get('[data-cy=floorsServed]').click();
    // Select the floors served from the dropdown
    elevatorData.floorsServed.forEach(floor => {
      cy.get(`mat-option`).contains(floor).click();
    });
    cy.get('body').first().type('{esc}').type('{esc}').type('{esc}'); // Close the dropdowns (2x esc
    cy.get('[data-cy=brand]').click().clear().type(elevatorData.brand);
    cy.get('[data-cy=modelE]').clear().type(elevatorData.modelE);
    cy.get('[data-cy=serialNumber]').clear().type(elevatorData.serialNumber);
    // Check if the elevator is created successfully
    cy.intercept({
      method: 'PATCH',
      url: '**/api/elevators'
    }).as('apiCheck')
    cy.get('[data-cy=description]').clear().type(elevatorData.description).type('{enter}');

    cy.wait('@apiCheck').then((interception) => {
      assert.equal(JSON.stringify({
        ...interception.response.body,
        code: undefined,
        id: undefined,
      }), JSON.stringify({
        ...elevatorData,
      }));
    })
  });

});
