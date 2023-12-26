describe('CreateUserRequestComponent', () => {
  beforeEach(() => {
    cy.visit('/api/auth/signUpRequest')
  });
  it('should create a new user request', () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johnDoe@isep.ipp.pt',
      nif: '123456789',
      phoneNumber: '912345678',
    };
    cy.get('[data-cy=firstName]').type(userData.firstName);
    cy.get('[data-cy=lastName]').type(userData.lastName);
    cy.get('[data-cy=email]').type(userData.email);
    cy.get('[data-cy=nif]').type(userData.nif);
    cy.get('[data-cy=phoneNumber]').type(userData.phoneNumber);
    // Check if the user request is created successfully
    cy.intercept({
      method: 'POST',
      url: '**/api/auth/signUpRequest'
    }).as('apiCheck')
    cy.get('[data-cy=submit]').click();
    cy.wait('@apiCheck').then((interception) =>{
      assert.equal(JSON.stringify({...interception.response.body, id:undefined}), JSON.stringify(userData));
    })

});
});
