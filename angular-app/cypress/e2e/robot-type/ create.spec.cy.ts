import { RobotType } from "../../../src/app/robot-type/robot-type";

describe('RobotTypeComponent', () => {

  beforeEach(() => {
    cy.visit('robotTypes');
  });

  const DEFAULT_ROBOT_TYPE:RobotType = {
    name: 'RobotTypeA',
    taskTypes : ['delivery', 'surveillance'],
    brand: 'TEST Brand 1',
    robotTypeModel: 'TEST Model 1',
  }

  it('should create a new robot type', () => {
    cy.get('input[id="name"]').type(DEFAULT_ROBOT_TYPE.name);
    cy.get('input[id="brand"]').type(DEFAULT_ROBOT_TYPE.brand);
    cy.get('input[id="model"]').type(DEFAULT_ROBOT_TYPE.robotTypeModel);
    cy.get(`input[id="${DEFAULT_ROBOT_TYPE.taskTypes[0]}"]`).type(DEFAULT_ROBOT_TYPE.taskTypes[0]);
    cy.get(`input[id="${DEFAULT_ROBOT_TYPE.taskTypes[1]}"]`).type(DEFAULT_ROBOT_TYPE.taskTypes[1]);

    cy.intercept({
        method: 'POST',
        url: '**/api/robotTypes'
        }).as('createRobotType')

    cy.get('input[type="submit"]').click();

    cy.wait('@createRobotType').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      expect(JSON.stringify({
        ...interception.response.body,
        id: undefined,
      })).to.eq(JSON.stringify(DEFAULT_ROBOT_TYPE));
    });
  });

  it('should fail to create a new robot type because the name is the same', () => {

    cy.get('input[id="name"]').type(DEFAULT_ROBOT_TYPE.name);
    cy.get('input[id="brand"]').type(DEFAULT_ROBOT_TYPE.brand);
    cy.get('input[id="model"]').type(DEFAULT_ROBOT_TYPE.robotTypeModel);
    cy.get(`input[id="${DEFAULT_ROBOT_TYPE.taskTypes[0]}"]`).type(DEFAULT_ROBOT_TYPE.taskTypes[0]);
    cy.get(`input[id="${DEFAULT_ROBOT_TYPE.taskTypes[1]}"]`).type(DEFAULT_ROBOT_TYPE.taskTypes[1]);

    cy.intercept({
        method: 'POST',
        url: '**/api/robotTypes'
        }).as('createRobotType')

    cy.get('input[type="submit"]').click();

    cy.wait('@createRobotType').then((interception) => {
      expect(interception.response.statusCode).to.eq(402);
      expect(interception.response.body).to.eq(`E11000 duplicate key error collection: test.robottypes index: name_1 dup key: { name: "${DEFAULT_ROBOT_TYPE.name}" }`);
    });
  });

});
