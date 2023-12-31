describe('CreateManagerComponent', () => {
  beforeEach(() => {
    //@ts-ignore
    cy.loginAdmin();
    cy.visit('/system-administrator/create-manager')
  });
  it('should create a new manager', () => {
    const managerData = {
      firstName: 'manager',
      lastName: 'test',
      email: 'managerTest@isep.ipp.pt',
      phoneNumber: '912345678',
      password: 'PasswordT@st1',
      role: 'Campus Manager'
    }
    //cy.wait(10000); // Adjust the wait time as needed
    cy.get('[data-cy=firstName]').type(managerData.firstName);
    cy.get('[data-cy=lastName]').type(managerData.lastName);
    cy.get('[data-cy=email]').type(managerData.email);
    cy.get('[data-cy=phoneNumber]').type(managerData.phoneNumber);


    // Check if the manager is created successfully
    cy.intercept({
      method: 'POST',
      url: '**/api/auth/signUp'
    }).as('apiCheck')
    // open dropdown
    cy.get('[data-cy=role]').click();
    // select role
    cy.get(`mat-option`).contains(managerData.role).click();
    cy.get('[data-cy=password]').type(managerData.password).type('{enter}');

    cy.wait('@apiCheck').then((interception) =>{
      const actualResponse = interception.response.body;
      //compare status
      assert.equal(interception.response.statusCode, 201);
    })
  });
});
