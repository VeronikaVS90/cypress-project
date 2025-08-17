import "../support/sensitive";
import authorization from "../pages/authorization";
import modalRegistration from "../pages/modalRegistration";

describe('LoginHttp', () => {
  beforeEach('Redirect on main automation page with http login', () => {
    authorization.httpAuthorization();  
  });

     it('Should show error for empty Name field', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();
    cy.get('input#signupName').focus().blur();
    cy.contains('Name required').should('be.visible');
  });

  it('Should show error for invalid Name', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();
    cy.get('input#signupName').type('123').blur();
    cy.contains('Name is invalid').should('be.visible');
  });

  it('Should accept valid Name', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();
    cy.get('input#signupName').type('Veronika').blur();
    cy.contains('Name is invalid').should('not.exist');
    cy.contains('Name is required').should('not.exist');
  });

  it('Should show error for invalid Email', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();
    cy.get('input#signupEmail').type('abc').blur();
    cy.contains('Email is incorrect').should('be.visible');
  });

  it('Should accept valid Email', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();
    cy.get('input#signupEmail').clear().type('test@test.com').blur();
    cy.contains('Email is incorrect').should('not.exist');
  });

  it('Should validate Password rules', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();
    cy.get('input#signupPassword').type('short', { sensitive: true }).blur();
    cy.contains('Password has to be from 8 to 15 characters long').should('be.visible');
  });

  it('Should show error if passwords do not match', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();
    cy.get('input#signupPassword').type('Nika54321', { sensitive: true });
    cy.get('input#signupRepeatPassword').type('Nika54325', { sensitive: true }).blur();
    cy.contains('Passwords do not match').should('be.visible');
  });

  it('Should enable Register button for valid form', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();
    cy.get('input#signupName').type('Veronika');
    cy.get('input#signupLastName').type('Sokolova');
    cy.get('input#signupEmail').type('test@test.com');
    cy.get('input#signupPassword').type('Nika54321', { sensitive: true });
    cy.get('input#signupRepeatPassword').type('Nika54321', { sensitive: true });

    cy.get('button.btn.btn-primary').should('not.be.disabled');
  });

  it('Open "Sign up modal window" => Registration', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();
    modalRegistration   
      .typeFirstName('Veronika')
      .typeSecondName('Sokolova')
      .typeEmail('vsokolovanika+123@gmail.com')
      .typePassword('Nika5432112345', { sensitive: true })  
      .typePasswordConfirm('Nika5432112345', { sensitive: true })
      .clickRegistrationButton();
  });
    
    it('Should login with valid credentials via UI', () => {
  cy.login('vsokolovanika+123@gmail.com', 'Nika5432112345');
});
});