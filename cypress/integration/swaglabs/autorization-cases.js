const errorIcons = () => {
  cy.get('form > :nth-child(1) > .svg-inline--fa').should('be.visible');
  cy.get('form > :nth-child(2) > .svg-inline--fa').should('be.visible');
};

const usernameCase = (username) => {
  cy.get('[data-test="username"]').clear().type(username);
  cy.get('[data-test="login-button"]').click();
  cy.get('.error-message-container')
    .should('contain', 'Epic sadface: Password is required');
  errorIcons();
  cy.get('.error-button').click();
};

const userpassCase = (username) => {
  cy.get('[data-test="username"]').clear().type(username);
  cy.get('[data-test="password"]').clear().type('password');
  cy.get('[data-test="login-button"]').click();
  cy.get('.error-message-container')
    .should('contain', 'Epic sadface: Username and password do not match any user in this service');
  errorIcons();
  cy.get('.error-button').click();
};

context('Negative cases', () => {

  beforeEach(() => {
    cy.clearCookie('rack.session');
    cy.visit(Cypress.env('host'));
    cy.location().should((loc) => expect(loc.href).to.include('https://www.saucedemo.com'));
  });

  it('Empty case', () => {
    cy.get('.login_credentials').should('exist');
    cy.get('.login_password').should('exist');
    cy.get('[data-test="login-button"]').click();
    errorIcons();
    cy.get('.error-message-container').should('contain', 'Epic sadface: Username is required');
    cy.get('.error-button').click();
  });

  it('Username cases', () => {
    usernameCase('standart_user');
    usernameCase('locked_out_user');
    usernameCase('problem_user');
    usernameCase('performance_glitch_user');
  });

  it('Password case', () => {
    cy.get('[data-test="password"]').clear().type('password');
    cy.get('[data-test="login-button"]').click();
    cy.get('.error-message-container')
      .should('contain', 'Epic sadface: Username is required');
    errorIcons();
    cy.get('.error-button').click();
  });

  it('User \'n pass cases', () => {
    userpassCase('standart_user');
    userpassCase('locked_out_user');
    userpassCase('problem_user');
    userpassCase('performance_glitch_user');
  });
});