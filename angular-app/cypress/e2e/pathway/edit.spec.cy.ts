// cypress/integration/create.spec.ts
import { Room } from "../../../src/app/room/room";
import { Pathway } from "../../../src/app/pathway/pathway";

describe('EditPathwayComponent', () => {
  beforeEach(() => {
    cy.visit("pathways/edit");
  });

  const DEFAULT_PATHWAY: Pathway = {
    domainId: "97faf530-84fa-438a-aa01-9e40b9e748ca",
    buildingSource: "teste A",
    buildingDestination: "teste",
    floorSource: 1,
    floorDestination: 1,
    description: 'Pathway description',
  }

  it('should edit existing pathway with all parameters', () => {

    // Fill in the form fields
    cy.get('[name="id"]').type(DEFAULT_PATHWAY.domainId);
    cy.get('[name="buildingSource"]').click().get(`mat-option[id="${DEFAULT_PATHWAY.buildingSource}"]`).click();
    cy.get('[name="buildingDestination"]').click().get(`mat-option[id="${DEFAULT_PATHWAY.buildingDestination}"]`).click()

    cy.wait(1000)
    cy.get('[name="floorSource"]').click().get(`mat-option[id=${DEFAULT_PATHWAY.floorSource}]`).click();
    cy.get('[name="floorDestination"]').click().get(`mat-option[id=${DEFAULT_PATHWAY.floorDestination}]`).click();

    cy.get('[name="description"]').type(DEFAULT_PATHWAY.description);
    // Check if the building is updated successfully
    cy.intercept({
      method: 'PATCH',
      url: '**/api/pathways*'
    }).as('apiCheck')

    cy.get('input[value=Edit]').click();

    cy.wait('@apiCheck').then((interception) =>{
      assert.equal(interception.response.statusCode, 202);
      assert.equal(JSON.stringify(interception.response.body), JSON.stringify({
        ...DEFAULT_PATHWAY,
      }))
    })
  });

  it('should fail to update a pathway if not given id', () => {

    cy.get('[name="buildingSource"]').click().get(`mat-option[id="${DEFAULT_PATHWAY.buildingSource}"]`).click();
    cy.get('[name="buildingDestination"]').click().get(`mat-option[id="${DEFAULT_PATHWAY.buildingDestination}"]`).click()

    cy.wait(1000)
    cy.get('[name="floorSource"]').click().get(`mat-option[id=${DEFAULT_PATHWAY.floorSource}]`).click();
    cy.get('[name="floorDestination"]').click().get(`mat-option[id=${DEFAULT_PATHWAY.floorDestination}]`).click();

    cy.get('[name="description"]').type(DEFAULT_PATHWAY.description);

    const stub = cy.stub()
    cy.on ('window:alert', stub)
    cy.get('input[value=Edit]').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Pathway ID is required')
      })

  });

  it('should fail to update a pathway if not given any field to edit', () => {

    cy.get('[name="id"]').type(DEFAULT_PATHWAY.domainId);

    cy.get('input[value=Edit]').click();

    // Check if the building is not updated
    cy.on('window:alert', (message) => {
      assert.equal(message, 'At least one field must be filled');
    });
  });

  it('should fail to update a pathway if does not exist', () => {

    // Fill in the form fields
    cy.get('[name="id"]').type("fail");
    cy.get('[name="buildingSource"]').click().get(`mat-option[id="${DEFAULT_PATHWAY.buildingSource}"]`).click();
    cy.get('[name="buildingDestination"]').click().get(`mat-option[id="${DEFAULT_PATHWAY.buildingDestination}"]`).click()

    cy.wait(1000)
    cy.get('[name="floorSource"]').click().get(`mat-option[id=${DEFAULT_PATHWAY.floorSource}]`).click();
    cy.get('[name="floorDestination"]').click().get(`mat-option[id=${DEFAULT_PATHWAY.floorDestination}]`).click();

    cy.get('[name="description"]').type(DEFAULT_PATHWAY.description);

    cy.get('input[value=Edit]').click();

    // Check if the building is not updated
    const stub = cy.stub()
    cy.on ('window:alert', stub)
    cy.get('input[value=Edit]').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('"Pathway not found"')
      })
  });

});
