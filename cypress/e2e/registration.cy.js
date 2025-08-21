import "../support/sensitive";
import authorization from "../pages/authorization";
import modalRegistration from "../pages/modalRegistration";

describe('LoginHttp', () => {
  beforeEach('Redirect on main automation page with http login', () => {
    authorization.httpAuthorization();
  });

  // NAME
  it('Should show error for empty Name field', () => {
    modalRegistration.open();
    modalRegistration.firstInput.focus().blur();
    modalRegistration.nameRequiredError.should('be.visible');
  });

  it('Should show error for invalid Name (digits)', () => {
    modalRegistration.open().typeFirstName('123').firstInput.blur();
    modalRegistration.nameInvalidError.should('be.visible');
  });

  it('Should show error for invalid Name length (too short)', () => {
    modalRegistration.open().typeFirstName('A').firstInput.blur();
    modalRegistration.nameLengthError.should('exist');
  });

  it('Should show error for invalid Name length (too long)', () => {
    modalRegistration.open().typeFirstName('A'.repeat(21)).firstInput.blur();
    modalRegistration.nameLengthError.should('exist');
  });

  it('Should show error for invalid Name (with spaces)', () => {
    modalRegistration.open().typeFirstName('  A  ').firstInput.blur();
    modalRegistration.nameInvalidError.should('exist');
  });

  it('Should accept valid Name', () => {
    modalRegistration.open().typeFirstName('Veronika').firstInput.blur();
    modalRegistration.nameInvalidError.should('not.exist');
    modalRegistration.nameRequiredError.should('not.exist');
  });

  // LAST NAME 
  it('Should show error for empty Last Name', () => {
    modalRegistration.open();
    modalRegistration.secondInput.clear().blur();
    modalRegistration.lastNameRequiredError.should('exist');
  });

  it('Should show error for invalid Last Name (digits)', () => {
    modalRegistration.open().typeSecondName('12345').secondInput.blur();
    modalRegistration.lastNameInvalidError.should('exist');
  });

  it('Should show error for invalid Last Name (symbols)', () => {
    modalRegistration.open().typeSecondName('@#$%').secondInput.blur();
    modalRegistration.lastNameInvalidError.should('exist');
  });

  it('Should show error for invalid Last Name length (too short)', () => {
    modalRegistration.open().typeSecondName('B').secondInput.blur();
    modalRegistration.lastNameLengthError.should('exist');
  });

  it('Should show error for invalid Last Name length (too long)', () => {
    modalRegistration.open().typeSecondName('B'.repeat(21)).secondInput.blur();
    modalRegistration.lastNameLengthError.should('exist');
  });

  it('Should show error for invalid Last Name (with spaces)', () => {
    modalRegistration.open().typeSecondName('  B  ').secondInput.blur();
    modalRegistration.lastNameInvalidError.should('exist');
  });

  it('Should accept valid Last Name', () => {
    modalRegistration.open().typeSecondName('Sokolova').secondInput.blur();
    modalRegistration.lastNameInvalidError.should('not.exist');
    modalRegistration.lastNameRequiredError.should('not.exist');
  });

  // EMAIL
  it('Should show error for invalid Email', () => {
    modalRegistration.open().typeEmail('abc').emailInput.blur();
    modalRegistration.emailInvalidError.should('be.visible');
  });

  it('Should show error for empty Email', () => {
    modalRegistration.open();
    modalRegistration.emailInput.clear().blur();
    modalRegistration.emailRequiredError.should('exist');
  });

  it('Should accept valid Email', () => {
    modalRegistration.open().typeEmail('test@test.com').emailInput.blur();
    modalRegistration.emailInvalidError.should('not.exist');
  });

  // PASSWORD
  it('Should show error for empty Password', () => {
    modalRegistration.open();
    modalRegistration.passwordInput.clear().blur();
    modalRegistration.passwordRequiredError.should('exist');
  });

  it('Should show error for invalid Password (too short)', () => {
    modalRegistration.open().typePassword('Ab1').passwordInput.blur();
    modalRegistration.passwordInvalidError.should('exist');
  });

  it('Should show error for invalid Password (only lowercase)', () => {
    modalRegistration.open().typePassword('password1').passwordInput.blur();
    modalRegistration.passwordInvalidError.should('exist');
  });

  it('Should show error for invalid Password (only uppercase)', () => {
    modalRegistration.open().typePassword('PASSWORD1').passwordInput.blur();
    modalRegistration.passwordInvalidError.should('exist');
  });

  it('Should show error for invalid Password (no digit)', () => {
    modalRegistration.open().typePassword('Password').passwordInput.blur();
    modalRegistration.passwordInvalidError.should('exist');
  });

  it('Should accept valid Password', () => {
    modalRegistration.open().typePassword('Nika987654').passwordInput.blur();
    modalRegistration.passwordInvalidError.should('not.exist');
  });

  // REPEAT PASSWORD
  it('Should show error when Passwords do not match', () => {
    modalRegistration.open()
      .typePassword('Password1')
      .typePasswordConfirm('Password2').confirmPasswordInput.blur();
    modalRegistration.repeatPasswordMismatchError.should('exist');
  });

  it('Should show error for empty Re-enter Password field', () => {
    modalRegistration.open();
    modalRegistration.confirmPasswordInput.clear().blur();
    modalRegistration.repeatPasswordRequiredError.should('exist');
  });

  it('Should accept valid Re-enter password', () => {
    modalRegistration.open()
      .typePassword('Nika987654')
      .typePasswordConfirm('Nika987654').confirmPasswordInput.blur();
    modalRegistration.repeatPasswordMismatchError.should('not.exist');
  });

  // REGISTER BUTTON
  it('Should keep Register button disabled for invalid form', () => {
    modalRegistration.open()
      .typeFirstName('Veronika')
      .typeSecondName('Sokolova')
      .typeEmail('wrongemail')
      .typePassword('short', { sensitive: true })
      .typePasswordConfirm('different', { sensitive: true });
    modalRegistration.registerButton.should('be.disabled');
  });

  it('Should enable Register button for valid form', () => {
    modalRegistration.open()
      .typeFirstName('Veronika')
      .typeSecondName('Sokolova')
      .typeEmail('test@test.com')
      .typePassword('Nika54321', { sensitive: true })
      .typePasswordConfirm('Nika54321', { sensitive: true });
    modalRegistration.registerButton.should('not.be.disabled');
  });

  it('Open "Sign up modal window" => Registration', () => {
    modalRegistration.open()
      .typeFirstName('Veronika')
      .typeSecondName('Sokolova')
      .typeEmail('vsokolovanika+123@gmail.com')
      .typePassword('Nika5432112345', { sensitive: true })
      .typePasswordConfirm('Nika5432112345', { sensitive: true })
      .clickRegistrationButton();
  });

  // LOGIN
  it('Should login with valid credentials via UI', () => {
    cy.login('vsokolovanika+123@gmail.com', 'Nika5432112345');
  });
});
