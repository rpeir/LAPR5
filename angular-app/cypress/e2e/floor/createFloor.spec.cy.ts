import {intersection} from "lodash";

describe('Create Floor spec', () => {
  beforeEach(() => {
    cy.visit('floors/create');
  });
  it('should create a new floor',()=>{
    const floorData={
      building:"A",
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
      assert.equal(intersection.response.statusCode,200);
      assert.equal(JSON.stringify({...intersection.response.body,domainId:undefined}),JSON.stringify({
        ...floorData
      }))
    })
  });
  it('should fail to create a new floor because floorNr is empty',()=>{
    const floorData={
      building:"A",
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
  it('should fail to create a new floor if it already exists',()=>{
    const floorData={
      building:"A",
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
      assert.equal(intersection.response.statusCode,402);
      assert.equal(JSON.stringify(intersection.response.body),(
       '{"isSuccess":false,"isFailure":true,"error":"E11000 duplicate key error collection: db.floors index: building_1_floorNr_1 dup key: { building: \\"ee1a010a-141f-4e94-ac2c-99138bac5514\\", floorNr: 50 }"}'
      ))
    })
  });
});
