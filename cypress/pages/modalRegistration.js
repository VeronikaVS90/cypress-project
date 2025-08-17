class ModalRegistration {
  // locators of the page elements
  get firstInput() {
    return cy.get('input#signupName');
  }

  get secondInput() {
    return cy.get('input#signupLastName');
  }

  get emailInput() {
    return cy.get('input#signupEmail');
  }

  get passwordInput() {
      return cy.get('input#signupPassword');
  }

  get confirmPasswordInput() {
      return cy.get('input#signupRepeatPassword');
  }

  get registerButton() {
    return cy.get('div.modal-footer > button.btn.btn-primary');
  }

  // methods for interacting with the elements
  typeFirstName(firstName) {
    this.firstInput.type(firstName);
    return this;
  }

  typeSecondName(secondName) {
    this.secondInput.type(secondName);
    return this;
  }

  typePassword(password, options = {}) {
  this.passwordInput.type(password, options);
  return this;
}

  typePasswordConfirm(confirmPassword, options = {}) {
  this.confirmPasswordInput.type(confirmPassword, options);
  return this;
}

  typeEmail(email) {
    this.emailInput.type(email);
    return this;
  }

  clickRegistrationButton() {
    this.registerButton.click( { multiple: true} );
  }
}

export default new ModalRegistration();