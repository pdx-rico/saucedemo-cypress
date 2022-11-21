export default {
    iconError: (n) => cy.get(`form > :nth-child(${n}) > .svg-inline--fa`),
    errorMessageCloseButton: () => cy.get('.error-button'),
    errorMessage: () => cy.get('.error-message-container'),
    loginButton: () => cy.get('[data-test="login-button"]'),
    usernameField: () => cy.get('[data-test="username"]'),
    passwordField: () => cy.get('[data-test="password"]'),
    loginCreds: () => cy.get('.login_credentials'),
    passwordCreds: () => cy.get('.login_password'),
    checkLocation: () => cy.location().should((loc) => expect(loc.href).to.include('https://www.saucedemo.com')),
    authPage: () => cy.visit(`${Cypress.env('host')}`),


    navigate() {
        this.authPage();
        this.checkLocation();
    },

    checkUsernameErrorIcon() {
        this.iconError(1).should('be.visible');
    },

    checkPasswordErrorIcon() {
        this.iconError(2).should('be.visible');
    },

    errorMessageCloseButtonClick() {
        this.errorMessageCloseButton().click();
    },

    errorMessageText(label) {
        this.errorMessage().should('contain', `${label}`);
    },

    usernameFieldInput(label) {
        this.usernameField().clear().type(`${label}`);
    },

    passwordFieldInput() {
        this.passwordField().clear().type('password');
    },

    loginButtonClick() {
        this.loginButton().click();
    },

    loginCredsCheck() {
        this.loginCreds().should('exist');
    },

    passwordCredsCheck() {
        this.passwordCreds().should('exist');
    },

};