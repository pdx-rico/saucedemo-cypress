import AuthorizationPage from '../../../../support/pageobjects/Desktop/AuthorizationPage';

const checkErrorIcons = () => {
  AuthorizationPage.checkUsernameErrorIcon();
  AuthorizationPage.checkPasswordErrorIcon();
};

const usernameCase = (username) => {
  AuthorizationPage.usernameFieldInput(username);
  AuthorizationPage.loginButtonClick();
  AuthorizationPage.errorMessageText('Epic sadface: Password is required');
  checkErrorIcons();
  AuthorizationPage.errorMessageCloseButtonClick();
};

const userpassCase = (username) => {
  AuthorizationPage.usernameFieldInput(username);
  AuthorizationPage.passwordFieldInput();
  AuthorizationPage.loginButtonClick();
  AuthorizationPage.errorMessageText('Epic sadface: Username and password do not match any user in this service');
  checkErrorIcons();
  AuthorizationPage.errorMessageCloseButtonClick();
};

context('Negative cases', () => {

  beforeEach(() => {
    cy.clearCookie('rack.session');
    AuthorizationPage.navigate();
  });

  it('Empty case', () => {
    AuthorizationPage.loginCredsCheck();
    AuthorizationPage.passwordCredsCheck();
    AuthorizationPage.loginButtonClick();
    checkErrorIcons();
    AuthorizationPage.errorMessageText ('Epic sadface: Username is required');
    AuthorizationPage.errorMessageCloseButtonClick();
  });

  it('Username cases', () => {
    usernameCase('standart_user');
    usernameCase('locked_out_user');
    usernameCase('problem_user');
    usernameCase('performance_glitch_user');
  });

  it('Password case', () => {
    AuthorizationPage.passwordCredsCheck();
    AuthorizationPage.loginButtonClick();
    AuthorizationPage.errorMessageText ('Epic sadface: Username is required');
    checkErrorIcons();
    AuthorizationPage.errorMessageCloseButtonClick();
  });

  it('User \'n pass cases', () => {
    userpassCase('standart_user');
    userpassCase('locked_out_user');
    userpassCase('problem_user');
    userpassCase('performance_glitch_user');
  });
});