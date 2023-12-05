// cypress/integration/create.spec.ts
import { Room } from "../../../src/app/room/room";
import { Pathway } from "../../../src/app/pathway/pathway";

describe('EditPathwayComponent', () => {
  beforeEach(() => {
    cy.visit("pathways/edit");
  });

  const DEFAULT_PATHWAY: Pathway = {
    buildingSource: "B",
    buildingDestination: "A",
    floorSource: 1,
    floorDestination: 1,
    description: 'B1-A1'
  }

  const OLD_DESCRIPTION = "A1-B1";

  it('should edit a pathway', () => {
    cy.wait(1000)
    cy.get('[name="select-pathway"]').click().get('mat-option').contains(OLD_DESCRIPTION).click();

    cy.get('[name="buildingSource"]').click().get(`mat-option[id="${DEFAULT_PATHWAY.buildingSource}"]`).click()
    cy.get('[name="floorSource"]').click().get(`mat-option[id=${DEFAULT_PATHWAY.floorSource}]`).click();
    cy.get('[name="buildingDestination"]').click().get(`mat-option[id="${DEFAULT_PATHWAY.buildingDestination}"]`).click()
    cy.get('[name="floorDestination"]').click().get(`mat-option[id=${DEFAULT_PATHWAY.floorDestination}]`).click();

    cy.get('[name="description"]').clear().type(DEFAULT_PATHWAY.description);

    cy.intercept({
      method: 'PATCH',
      url: '**/api/pathways*'
    }).as('apiCheck')

    cy.get('input[value=Edit]').click();

    cy.wait('@apiCheck').then((interception) =>{
      assert.equal(interception.response.statusCode, 202);
      assert.equal(JSON.stringify({
        ...interception.response.body,
        domainId: undefined
      }), JSON.stringify({
        "buildingSource": DEFAULT_PATHWAY.buildingSource,
        "buildingDestination": DEFAULT_PATHWAY.buildingDestination,
        "floorSource": DEFAULT_PATHWAY.floorSource,
        "floorDestination": DEFAULT_PATHWAY.floorDestination,
        "description": DEFAULT_PATHWAY.description
      }))
    })
  });

});
