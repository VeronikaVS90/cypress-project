class ModalRegistration {
  // Locators
  // Inputs
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

  // Error messages
  get nameRequiredError() {
    return cy.contains('Name required');
  }

  get nameInvalidError() {
    return cy.contains('Name is invalid');
  }

  get nameLengthError() {
    return cy.contains('Name has to be from 2 to 20 characters long');
  }

  get lastNameRequiredError() {
    return cy.contains('Last name required');
  }

  get lastNameInvalidError() {
    return cy.contains('Last name is invalid');
  }

  get lastNameLengthError() {
    return cy.contains('Last name has to be from 2 to 20 characters long');
  }

  get emailRequiredError() {
    return cy.contains('Email required');
  }

  get emailInvalidError() {
    return cy.contains('Email is incorrect');
  }

  get passwordRequiredError() {
    return cy.contains('Password required');
  }

  get passwordInvalidError() {
    return cy.contains(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    );
  }

  get repeatPasswordRequiredError() {
    return cy.contains('Re-enter password required');
  }

  get repeatPasswordMismatchError() {
    return cy.contains('Passwords do not match');
  }

  // Actions
  open() {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();
    return this;
  }

  typeFirstName(firstName) {
    this.firstInput.clear().type(firstName);
    return this;
  }

  typeSecondName(secondName) {
    this.secondInput.clear().type(secondName);
    return this;
  }

  typeEmail(email) {
    this.emailInput.clear().type(email);
    return this;
  }

  typePassword(password, options = {}) {
    this.passwordInput.clear().type(password, options);
    return this;
  }

  typePasswordConfirm(confirmPassword, options = {}) {
    this.confirmPasswordInput.clear().type(confirmPassword, options);
    return this;
  }

  clickRegistrationButton() {
    this.registerButton.click({ multiple: true });
  }
}

export default new ModalRegistration();
