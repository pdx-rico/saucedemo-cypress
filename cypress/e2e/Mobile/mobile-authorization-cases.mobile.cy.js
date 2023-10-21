import MobileAuthorizationPage from '../../../../support/pageobjects/Mobile/MobileAuthorizationPage';

const checkErrorIcons = () => {
  MobileAuthorizationPage.checkUsernameErrorIcon();
  MobileAuthorizationPage.checkPasswordErrorIcon();
};

const usernameCase = (username) => {
  MobileAuthorizationPage.usernameFieldInput(username);
  MobileAuthorizationPage.loginButtonClick();
  MobileAuthorizationPage.errorMessageText('Epic sadface: Password is required');
  checkErrorIcons();
  MobileAuthorizationPage.errorMessageCloseButtonClick();
};

const userpassCase = (username) => {
  MobileAuthorizationPage.usernameFieldInput(username);
  MobileAuthorizationPage.passwordFieldInput();
  MobileAuthorizationPage.loginButtonClick();
  MobileAuthorizationPage.errorMessageText('Epic sadface: Username and password do not match any user in this service');
  checkErrorIcons();
  MobileAuthorizationPage.errorMessageCloseButtonClick();
};

context('Negative cases', () => {

  beforeEach(() => {
    cy.viewport(375, 812);
    cy.clearCookie('rack.session');
    MobileAuthorizationPage.navigate();
  });

  it('Empty case', () => {
    MobileAuthorizationPage.loginCredsCheck();
    MobileAuthorizationPage.passwordCredsCheck();
    MobileAuthorizationPage.loginButtonClick();
    checkErrorIcons();
    MobileAuthorizationPage.errorMessageText ('Epic sadface: Username is required');
    MobileAuthorizationPage.errorMessageCloseButtonClick();
  });

  it('Username cases', () => {
    usernameCase('standart_user');
    usernameCase('locked_out_user');
    usernameCase('problem_user');
    usernameCase('performance_glitch_user');
  });

  it('Password case', () => {
    MobileAuthorizationPage.passwordCredsCheck();
    MobileAuthorizationPage.loginButtonClick();
    MobileAuthorizationPage.errorMessageText ('Epic sadface: Username is required');
    checkErrorIcons();
    MobileAuthorizationPage.errorMessageCloseButtonClick();
  });

  it('User \'n pass cases', () => {
    userpassCase('standart_user');
    userpassCase('locked_out_user');
    userpassCase('problem_user');
    userpassCase('performance_glitch_user');
  });
});