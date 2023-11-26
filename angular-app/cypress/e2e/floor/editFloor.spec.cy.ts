import {response} from "express";

describe('edit floor spec', () => {
  beforeEach(() => {
    cy.visit('floors/edit');
  });
  it('should edit a floor',()=> {
    const floorData = {
      building: "B",
      description: "desc floor",
      floorNr: 1
    };

    cy.get('[data-cy=designation]').click();
    cy.get(`mat-option[id="${floorData.building}"]`).click();
    cy.wait(1000);
    cy.get('[data-cy=sourceFloor]').click();
    cy.get(`mat-option[id="${floorData.floorNr}"]`).click();

    cy.get('[data-cy=newFloorNumber]').type(String(floorData.floorNr));
    cy.get('[data-cy=description]').type(floorData.description);
    cy.intercept({
      method: 'PUT',
      url: '**/api/floors'
    }).as('apiCheck')
    cy.get('[data-cy=editFloor]').click();

    cy.wait('@apiCheck').then((interception) => {
      assert.equal(interception.response.statusCode, 200);
    });
  });
});
