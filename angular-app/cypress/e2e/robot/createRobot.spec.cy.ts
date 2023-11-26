describe('Create Robot spec', () => {
  beforeEach(() => {
    cy.visit('robots/create');
  });
  it('should create a new robot', () => {
      const robotData = {
        robotCode: 'TEST-code',
        nickName: 'TEST-nick',
        robotType: 'RobotTypeA',
        serialNr:'12345',
        description: 'test robot',
        state: 'true',
      };
      cy.get('[data-cy=nickName]').type(robotData.nickName);
      cy.get('[data-cy=robotCode]').type(robotData.robotCode);
      cy.get('[data-cy=serialNumber]').type(robotData.serialNr);
      cy.get('[data-cy=description]').type(robotData.description);
      cy.get('[data-cy=robotType]').click();
      cy.get(`mat-option[id="${robotData.robotType}"]`).click();



      cy.intercept({
        method: 'POST',
        url: '**/api/robots'
      }).as('apiCheck')
      cy.get('input[value=create]').click();
      cy.wait('@apiCheck').then((interception) =>{
        assert.equal(interception.response.statusCode, 201);
        assert.equal(JSON.stringify(interception.response.body), JSON.stringify({
          ...robotData
        }))
      })
  });
  it('should fail to create a robot if not given robotCode', () => {
    const robotData = {
      nickName: 'test',
      robotType: 'RobotTypeA',
      serialNr:'12345',
      description: 'test robot',
      state: 'true',
    };
    cy.get('[data-cy=nickName]').type(robotData.nickName);
    cy.get('[data-cy=serialNumber]').type(robotData.serialNr);
    cy.get('[data-cy=description]').type(robotData.description);
    cy.get('[data-cy=robotType]').click();
    cy.get(`mat-option[id="${robotData.robotType}"]`).click();

    cy.intercept({
      method: 'POST',
      url: '**/api/robots'
    }).as('apiCheck')
    cy.get('input[value=create]').click();

    cy.wait('@apiCheck').then((interception) =>{
      assert.equal(interception.response.statusCode, 400);
      assert.equal(JSON.stringify(interception.response.body), JSON.stringify({
        "error":"Bad Request","message":"\"robotCode\" is required"
      }))
    })
  });
  it('should fail to create a robot if not given nickName', () => {
    const robotData = {
      robotCode: '1',
      robotType: 'RobotTypeA',
      serialNr:'12345',
      description: 'test robot',
      state: 'true',
    };
    cy.get('[data-cy=robotCode]').type(robotData.robotCode);
    cy.get('[data-cy=serialNumber]').type(robotData.serialNr);
    cy.get('[data-cy=description]').type(robotData.description);
    cy.get('[data-cy=robotType]').click();
    cy.get(`mat-option[id="${robotData.robotType}"]`).click();

    cy.intercept({
      method: 'POST',
      url: '**/api/robots'
    }).as('apiCheck')
    cy.get('input[value=create]').click();

    cy.wait('@apiCheck').then((interception) =>{
      assert.equal(interception.response.statusCode, 400);
      assert.equal(JSON.stringify(interception.response.body), JSON.stringify({
        "error":"Bad Request","message":"\"nickName\" is required"
      }))
    })
  });
  it('should fail to create a robot if not given serialNr', () => {
    const robotData = {
      robotCode: '1',
      nickName: 'test',
      robotType: 'RobotTypeA',
      description: 'test robot',
      state: 'true',
    };
    cy.get('[data-cy=robotCode]').type(robotData.robotCode);
    cy.get('[data-cy=nickName]').type(robotData.nickName);
    cy.get('[data-cy=description]').type(robotData.description);
    cy.get('[data-cy=robotType]').click();
    cy.get(`mat-option[id="${robotData.robotType}"]`).click();

    cy.intercept({
      method: 'POST',
      url: '**/api/robots'
    }).as('apiCheck')
    cy.get('input[value=create]').click();

    cy.wait('@apiCheck').then((interception) =>{
      assert.equal(interception.response.statusCode, 400);
      assert.equal(JSON.stringify(interception.response.body), JSON.stringify({
        "error":"Bad Request","message":"\"serialNr\" is required"
      }))
    })
  });
  it('should fail to create a robot if not given robotType', () => {
    const robotData = {
      robotCode: '1',
      nickName: 'test',
      serialNr:'12345',
      description: 'test robot',
      state: 'true',
    };
    cy.get('[data-cy=robotCode]').type(robotData.robotCode);
    cy.get('[data-cy=nickName]').type(robotData.nickName);
    cy.get('[data-cy=serialNumber]').type(robotData.serialNr);
    cy.get('[data-cy=description]').type(robotData.description);

    cy.intercept({
      method: 'POST',
      url: '**/api/robots'
    }).as('apiCheck')
    cy.get('input[value=create]').click();

    cy.wait('@apiCheck').then((interception) =>{
      assert.equal(interception.response.statusCode, 400);
      assert.equal(JSON.stringify(interception.response.body), JSON.stringify({
        "error":"Bad Request","message":"\"robotType\" is required"
      }))
    })
  });
  it('should fail to create a robot if not given description', () => {
    const robotData = {
      robotCode: '1',
      nickName: 'test',
      robotType: 'RobotTypeA',
      serialNr:'12345',
      state: 'true',
    };
    cy.get('[data-cy=robotCode]').type(robotData.robotCode);
    cy.get('[data-cy=nickName]').type(robotData.nickName);
    cy.get('[data-cy=serialNumber]').type(robotData.serialNr);
    cy.get('[data-cy=robotType]').click();
    cy.get(`mat-option[id="${robotData.robotType}"]`).click();

    cy.intercept({
      method: 'POST',
      url: '**/api/robots'
    }).as('apiCheck')
    cy.get('input[value=create]').click();

    cy.wait('@apiCheck').then((interception) =>{
      assert.equal(interception.response.statusCode, 400);
      assert.equal(JSON.stringify(interception.response.body), JSON.stringify({
        "error":"Bad Request","message":"\"description\" is required"
      }))
    })
  });
  it('should fail if it exists a robot with the same robotCode', () => {
    const robotData = {
      robotCode: 'TEST-code',
      nickName: 'newNick',
      robotType: 'RobotTypeA',
      serialNr:'12345',
      description: 'test robot',
      state: 'true',
    };
    cy.get('[data-cy=robotCode]').type(robotData.robotCode);
    cy.get('[data-cy=nickName]').type(robotData.nickName);
    cy.get('[data-cy=serialNumber]').type(robotData.serialNr);
    cy.get('[data-cy=description]').type(robotData.description);
    cy.get('[data-cy=robotType]').click();
    cy.get(`mat-option[id="${robotData.robotType}"]`).click();

    cy.intercept({
      method: 'POST',
      url: '**/api/robots'
    }).as('apiCheck')
    cy.get('input[value=create]').click();

    cy.wait('@apiCheck').then((interception) =>{
      assert.equal(interception.response.statusCode, 402);
      assert.equal(JSON.stringify(interception.response.body),
        '"E11000 duplicate key error collection: test.robots index: robotCode_1 dup key: { robotCode: \\"TEST-code\\" }"')
      })
    })
});
