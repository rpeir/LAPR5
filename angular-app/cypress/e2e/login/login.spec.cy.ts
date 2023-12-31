describe('template spec', () => {
  it('passes', () => {
    // @ts-ignore
    cy.loginCampusManager();
    cy.visit('/')
  })
})
