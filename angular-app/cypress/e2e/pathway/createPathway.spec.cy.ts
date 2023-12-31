import {Pathway} from "../../../src/app/pathway/pathway";

describe('Create Pathway Component', () => {
  beforeEach(() => {
    // @ts-ignore
    cy.loginCampusManager();
    cy.visit("pathways/create");
  });
  const DEFAULT_PATHWAY: Pathway = {
    buildingSource: "A",
    buildingDestination: "B",
    floorSource: 1,
    floorDestination: 1,
    description: 'A1-B1'
  }

  it('should create a pathway with all parameters', () => {
    // Fill in the form fields
    cy.get('[name="buildingSource"]').click()
    cy.get(`mat-option[id="${DEFAULT_PATHWAY.buildingSource}"]`).click();
    cy.get('[name="buildingDestination"]').click()
    cy.get(`mat-option[id="${DEFAULT_PATHWAY.buildingDestination}"]`).click()
    cy.wait(1000)
    cy.get('[name="floorSource"]').click().get(`mat-option[id=${DEFAULT_PATHWAY.floorSource}]`).click();
    cy.get('[name="floorDestination"]').click().get(`mat-option[id=${DEFAULT_PATHWAY.floorDestination}]`).click();
    cy.get('[name="description"]').type(DEFAULT_PATHWAY.description);
    // Check if the building is updated successfully
    cy.intercept({
      method: 'POST',
      url: '**/api/pathways*'
    }).as('apiCheck')
    cy.get('input[value=create]').click();

    cy.wait('@apiCheck').then((interception) =>{
      assert.equal(interception.response.statusCode, 201);
      assert.equal(JSON.stringify({...interception.response.body,domainId: undefined}), JSON.stringify({

        ...DEFAULT_PATHWAY,

      }))
    })
  });

  it('should fail to create a pathway if not given buildingSource', () => {
    cy.get('[name="buildingDestination"]').click().get(`mat-option[id="${DEFAULT_PATHWAY.buildingDestination}"]`).click()
    cy.wait(2000)
    cy.get('[name="floorDestination"]').click().get(`mat-option[id=${DEFAULT_PATHWAY.floorDestination}]`).click();
    cy.get('[name="description"]').type(DEFAULT_PATHWAY.description);

    cy.intercept({
      method: 'POST',
      url: '**/api/pathways*'
    }).as('apiCheck')
    cy.get('input[value=create]').click();

    cy.wait('@apiCheck').then((interception) =>{
      assert.equal(interception.response.statusCode, 400);
      assert.equal(JSON.stringify(interception.response.body), JSON.stringify({
        "error":"Bad Request","message":"\"buildingSource\" is required"
      }))
    })
    // Check if the building is not updated
    cy.on('window.alert', (message) => {
      expect(message).to.equal(
        '"error":"Bad Request","message":"\\"buildingSource\\" is required"'
      );
    });
  });
});
