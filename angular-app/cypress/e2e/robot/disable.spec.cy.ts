import { Robot } from "../../../src/app/robot/robot";

describe('DisableRobotComponent', () => {

  beforeEach(() => {
    cy.visit('robots/disable');
  });

  const DEFAULT_NICKNAME = 'TEST-nick';
  const DEFAULT_CODE = 'TEST-code';


  it('should disable a robot by nickname if exists', () => {

    cy.get('mat-select[id="disable-option"]').click();
    cy.get('mat-option').contains('Nickname').click();

    cy.get('input[name="nickName"]').type(DEFAULT_NICKNAME);

    cy.intercept({
      method: 'PATCH',
      url: '**/api/robots/disable-by-nick'
    }).as('apiCheck');

    cy.get('input[type="submit"]').click();

    cy.wait('@apiCheck').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
    });

  });

  it('should disable a robot by code if exists', () => {

    cy.get('mat-select[id="disable-option"]').click();
    cy.get('mat-option').contains('Code').click();

    cy.get('input[name="code"]').type(DEFAULT_CODE);

    cy.intercept({
      method: 'PATCH',
      url: '**/api/robots/disable-by-code'
    }).as('apiCheck');

    cy.get('input[type="submit"]').click();

    cy.wait('@apiCheck').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
    });

  });

  it('should fail to disable a robot if not given nickname', () => {

    cy.get('mat-select[id="disable-option"]').click();
    cy.get('mat-option').contains('Nickname').click();

    const stub = cy.stub()
    cy.on ('window:alert', stub)
    cy.get('input[type="submit"]').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Please insert nickname')
      })
  });

  it('should fail to disable a robot if not given code', () => {

    cy.get('mat-select[id="disable-option"]').click();
    cy.get('mat-option').contains('Code').click();

    const stub = cy.stub()
    cy.on ('window:alert', stub)
    cy.get('input[type="submit"]').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Please insert code')
      })
  });

});
