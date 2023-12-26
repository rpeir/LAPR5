// cypress/integration/create.spec.ts
import { Room } from "../../../src/app/room/room";

describe('CreateRoomComponent', () => {
  beforeEach(() => {
    cy.visit("rooms/create");
  });

  const randomName = generateRandomString(10);

  it('should create a new room', () => {
    // Generate random values for name
    const DEFAULT_ROOM: Room = {
      id : undefined,
      name : 'Room1 A1',
      description : 'Room Test',
      category : 'Classroom',
      floor : 1,
      building : 'A'
    }
    const BUILDING_CODE = '1';

    // Fill in the form fields
    cy.get('[name="name"]').type(DEFAULT_ROOM.name);
    cy.get('[name="description"]').type(DEFAULT_ROOM.description);
    // Select the category
    cy.get('[name="category"]').click().get('mat-option').contains(DEFAULT_ROOM.category).click();
    cy.get('body').type('{esc}');

    cy.get('[name="buildingDesignation"]').click().get(`mat-option[id=${DEFAULT_ROOM.building}]`).click()

    cy.wait(1000)
    cy.get('[name="floor"]').click().get(`mat-option[id=${DEFAULT_ROOM.floor}]`).click();

    // Check if the building is created successfully
    cy.intercept({
      method: 'POST',
      url: '**/api/rooms'
    }).as('apiCheck')

    cy.get('input[value=create]').click();

    cy.wait('@apiCheck').then((interception) =>{
      assert.equal(interception.response.statusCode, 201);
      assert.equal(JSON.stringify({
        ...interception.response.body,
        id : undefined
      }), JSON.stringify({
        ...DEFAULT_ROOM,
        floor: DEFAULT_ROOM.floor.toString(),
        building: BUILDING_CODE,
        category: DEFAULT_ROOM.category.charAt(0).toLowerCase().concat(DEFAULT_ROOM.category.substring(1))
      }))
    })
  });
  it('should fail to create a new room because the name is the same', () => {
    // Generate random values for name
    const DEFAULT_ROOM: Room = {
      id : undefined,
      name : 'Room1 A1',
      description : 'Room Test',
      category : 'Classroom',
      floor : 1,
      building : 'A'
    }
    const BUILDING_CODE = '1';

    // Fill in the form fields
    cy.get('[name="name"]').type(DEFAULT_ROOM.name);
    cy.get('[name="description"]').type(DEFAULT_ROOM.description);
    // Select the category
    cy.get('[name="category"]').click().get('mat-option').contains(DEFAULT_ROOM.category).click();
    cy.get('body').type('{esc}');

    cy.get('[name="buildingDesignation"]').click().get(`mat-option[id=${DEFAULT_ROOM.building}]`).click();

    cy.wait(1000)

    cy.get('[name="floor"]').click().get(`mat-option[id=${DEFAULT_ROOM.floor}]`).click();

    // Check if the building is created successfully
    cy.intercept({
      method: 'POST',
      url: '**/api/rooms'
    }).as('apiCheck')

    cy.get('input[value=create]').click();

    cy.wait('@apiCheck').then((interception) =>{
      assert.equal(interception.response.statusCode, 402);
      assert.equal(JSON.stringify(interception.response.body),
      `{"error":"Already exists room with {\\"name\\":\\"${DEFAULT_ROOM.name}\\"}\"}`
      )
    })

  });
// Helper function to generate a random string of a given length
  function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
});
