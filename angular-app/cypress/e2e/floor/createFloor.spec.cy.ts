import {intersection} from "lodash";

describe('Create Floor spec', () => {
  beforeEach(() => {
    cy.visit('floors/create');
  });
  it('should create a new floor',()=>{
    const floorData={
      building:"C",
      description:"desc floor",
      floorNr:50
    };
    cy.get('[data-cy=buildingDesignation]').click();
    cy.get(`mat-option[id="${floorData.building}"]`).click();
    cy.get('[data-cy=floorNr]').type(String(floorData.floorNr));
    cy.get('[data-cy=description]').type(floorData.description);

    cy.intercept({
      method:'POST',
      url:'**/api/floors',
    }).as('apiCheck')

    cy.get('input[value=create]').click();
    cy.wait('@apiCheck').then((intersection)=>{
      assert.equal(intersection.response.statusCode,201);
      assert.equal(JSON.stringify({...intersection.response.body,domainId:undefined}),JSON.stringify({
        ...floorData
      }))
    })
  });
  it('should fail to create a new floor because floorNr is empty',()=>{
    const floorData={
      building:"C",
      description:"desc floor",
    };
    cy.get('[data-cy=buildingDesignation]').click();
    cy.get(`mat-option[id="${floorData.building}"]`).click();
    cy.get('[data-cy=description]').type(floorData.description);

    cy.intercept({
      method:'POST',
      url:'**/api/floors',
    }).as('apiCheck')

    cy.get('input[value=create]').click();
    cy.wait('@apiCheck').then((intersection)=>{
      assert.equal(intersection.response.statusCode,400);
      assert.equal(JSON.stringify(intersection.response.body),JSON.stringify({
        "error":"Bad Request","message":"\"floorNr\" is required"
      }))
    })
  });
  it('should fail to create a new floor because building is empty',()=>{
    const floorData={
      description:"desc floor",
      floorNr:50
    };
    cy.get('[data-cy=floorNr]').type(String(floorData.floorNr));
    cy.get('[data-cy=description]').type(floorData.description);

    cy.intercept({
      method:'POST',
      url:'**/api/floors',
    }).as('apiCheck')

    cy.get('input[value=create]').click();
    cy.wait('@apiCheck').then((intersection)=>{
      assert.equal(intersection.response.statusCode,400);
      assert.equal(JSON.stringify(intersection.response.body),JSON.stringify({
        "error":"Bad Request","message":"\"building\" is required"
      }))
    })
  });
});
