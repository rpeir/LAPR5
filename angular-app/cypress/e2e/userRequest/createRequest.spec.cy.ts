describe('CreateUserRequestComponent', () => {
  beforeEach(() => {
    cy.visit('/signup')
  });
  it('should create a new user request', () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johnDoe@isep.ipp.pt',
      phoneNumber: '912345678',
      password:'PasswordT@st1',
      nif: '123456789',
    };
    const request = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johnDoe@isep.ipp.pt',
      phoneNumber: '912345678',
      password:'',
      nif: '123456789',
      state:'pending'
    }
    cy.get('[data-cy=firstName]').type(userData.firstName);
    cy.get('[data-cy=lastName]').type(userData.lastName);
    cy.get('[data-cy=email]').type(userData.email);
    cy.get('[data-cy=phoneNumber]').type(userData.phoneNumber);
    cy.get('[data-cy=password]').type(userData.password);


    // Check if the user request is created successfully
    cy.intercept({
      method: 'POST',
      url: '**/api/auth/signUpRequest'
    }).as('apiCheck')
    cy.get('[data-cy=nif]').type(userData.nif).type('{enter}');
    cy.wait('@apiCheck').then((interception) =>{
      assert.equal(JSON.stringify({...interception.response.body, id:undefined}), JSON.stringify(request));
    })

});
});
