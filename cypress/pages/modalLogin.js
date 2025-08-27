class ModalLogin {

    // Locators of page elements
    
  get signInButton() {
    return cy.get('button.btn-outline-white.header_signin');
  }

  get emailInput() {
    return cy.get('input#signinEmail')
  }

  get passwordInput() {
    return cy.get('input#signinPassword')
  }

  get loginButton() {
    return cy.contains('button', 'Login')
  }

    // Methods for interaction with elements
  
  clickSignInButton() {
    this.signInButton.click();
    return this;
  }
  
  typeEmailInput(email) {
    this.emailInput.type(email);
    return this;
  }

  typePasswordInput(password) {
    this.passwordInput.type(password, {sensitive: true});
    return this;
  }

  clickLogInButton() {
    this.loginButton.click();
    return this;
  }
}

export default new ModalLogin();