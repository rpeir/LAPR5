describe('Accept Request', () => {
  beforeEach(() => {
    //@ts-ignore
    cy.loginAdmin();
    cy.visit('/system-administrator/register-user');
  });
  it('should accept a request', () => {
     const userData = {
       firstName: 'John',
       lastName: 'Doe',
       email: 'johndoe@isep.ipp.pt',
       phoneNumber: '912345678',
       password:'PasswordT@st1',
       nif: '123456789',
     }
    const request = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@isep.ipp.pt',
      phoneNumber: '912345678',
      password:'',
      nif: '123456789',
      state:'accepted'
    }
    cy.wait(3000);
    cy.get('[data-cy=request]').click();
    //select request
    cy.get(`mat-option`).contains(userData.email).click();

    cy.intercept({
      method: 'POST',
      url: '**/api/userRequests/register-user'
    }).as('apiCheck')


    cy.get('[data-cy=accept]').click();



    cy.wait('@apiCheck').then((interception) =>{
      const actualResponse = interception.response.body;
      //compare status
      assert.equal(interception.response.statusCode, 201);
    })
  });
});
