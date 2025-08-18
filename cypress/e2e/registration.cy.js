import "../support/sensitive";
import authorization from "../pages/authorization";
import modalRegistration from "../pages/modalRegistration";

describe('LoginHttp', () => {
  beforeEach('Redirect on main automation page with http login', () => {
    authorization.httpAuthorization();  
  });

  // field Name
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

  it('Should show error for invalid Name length', () => {
  cy.get('button.hero-descriptor_btn.btn.btn-primary').click();

  cy.get('input#signupName').clear().type('A').blur();
  cy.contains('Name has to be from 2 to 20 characters long').should('exist');

  const longName = 'A'.repeat(21); 
  cy.get('input#signupName').clear().type(longName).blur();
  cy.contains('Name has to be from 2 to 20 characters long').should('exist');

  cy.get('input#signupName').clear().type('  A  ').blur();
  cy.contains('Name is invalid').should('exist');
  });
  
   it('Should have red border for invalid Name field', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();

    cy.get('input#signupName').clear().type(' A ').blur();

    cy.get('input#signupName')
      .should('have.css', 'border-color')
      .and('eq', 'rgb(220, 53, 69)'); 
  });

  it('Should accept valid Name', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();
    cy.get('input#signupName').type('Veronika').blur();
    cy.contains('Name is invalid').should('not.exist');
    cy.contains('Name is required').should('not.exist');
  });

  // field Last name
  it('Should show error for empty Last Name', () => {
  cy.get('button.hero-descriptor_btn.btn.btn-primary').click();

  cy.get('input#signupLastName').clear().blur();
  cy.contains('Last name required').should('exist');
  });
  
  it('Should show error for invalid Last Name (wrong data)', () => {
  cy.get('button.hero-descriptor_btn.btn.btn-primary').click();

  cy.get('input#signupLastName').clear().type('12345').blur();
  cy.contains('Last name is invalid').should('exist');

  cy.get('input#signupLastName').clear().type('@#$%').blur();
  cy.contains('Last name is invalid').should('exist');
  });
  
  it('Should show error for invalid Last Name length', () => {
  cy.get('button.hero-descriptor_btn.btn.btn-primary').click();

  cy.get('input#signupLastName').clear().type('B').blur();
  cy.contains('Last name has to be from 2 to 20 characters long').should('exist');

  const longLastName = 'B'.repeat(21);
  cy.get('input#signupLastName').clear().type(longLastName).blur();
  cy.contains('Last name has to be from 2 to 20 characters long').should('exist');

  cy.get('input#signupLastName').clear().type('  B  ').blur();
  cy.contains('Last name is invalid').should('exist');
  });

  it('Should have red border for invalid Last Name field', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();

    cy.get('input#signupLastName').clear().type(' A ').blur();

    cy.get('input#signupLastName')
      .should('have.css', 'border-color')
      .and('eq', 'rgb(220, 53, 69)'); 
  });

   it('Should accept valid Last name', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();
    cy.get('input#signupName').type('Sokolova').blur();
    cy.contains('Name is invalid').should('not.exist');
    cy.contains('Name is required').should('not.exist');
  });
  
// field "Email"
  it('Should show error for invalid Email', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();
    cy.get('input#signupEmail').type('abc').blur();
    cy.contains('Email is incorrect').should('be.visible');
  });

   it('Should show error for empty Email', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();

    cy.get('input#signupEmail').clear().blur();
    cy.contains('Email required').should('exist');
   });
  
  it('Should have red border for invalid Email field', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();

    cy.get('input#signupEmail').clear().type('abc').blur();

    cy.get('input#signupEmail')
      .should('have.css', 'border-color')
      .and('eq', 'rgb(220, 53, 69)'); 
  });

  it('Should accept valid Email', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();
    cy.get('input#signupEmail').clear().type('test@test.com').blur();
    cy.contains('Email is incorrect').should('not.exist');
  });

  // field Password
   it('Should show error for empty Password', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();

    cy.get('input#signupPassword').clear().blur();
    cy.contains('Password required').should('exist');
  });

  it('Should show error for invalid Password (wrong data)', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();

    cy.get('input#signupPassword').clear().type('Ab1').blur();
    cy.contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
      .should('exist');

    cy.get('input#signupPassword').clear().type('password1').blur();
    cy.contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
      .should('exist');

    cy.get('input#signupPassword').clear().type('PASSWORD1').blur();
    cy.contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
      .should('exist');

    cy.get('input#signupPassword').clear().type('Password').blur();
    cy.contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
      .should('exist');
  });

  it('Should have red border for invalid Password field', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();

    cy.get('input#signupPassword').clear().type('123').blur();

    cy.get('input#signupPassword')
      .should('have.css', 'border-color')
      .and('eq', 'rgb(220, 53, 69)'); 
  });

  it('Should accept valid Password', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();
    cy.get('input#signupPassword').clear().type('Nika987654').blur();
    cy.contains('Email is incorrect').should('not.exist');
  });

  // field Re-enter password
  it('Should show error when Passwords do not match', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();

    cy.get('input#signupPassword').clear().type('Password1');
    cy.get('input#signupRepeatPassword').clear().type('Password2').blur();

    cy.contains('Passwords do not match').should('exist');
  });

  it('Should show error for empty Re-enter Password field', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();

    cy.get('input#signupRepeatPassword').clear().blur();
    cy.contains('Re-enter password required').should('exist');
  });

  it('Should have red border for invalid Password field', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();

    cy.get('input#signupPassword').clear().type('abc').blur();

    cy.get('input#signupPassword')
      .should('have.css', 'border-color')
      .and('eq', 'rgb(220, 53, 69)'); 
  });

  it('Should accept valid Re-enter password', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary').click();
     cy.get('input#signupPassword').clear().type('Nika987654');
    cy.get('input#signupRepeatPassword').clear().type('Nika987654').blur();

    cy.contains('Passwords do not match').should('not.exist');
  });

  // button Register
it('Should keep Register button disabled for invalid form', () => {
  cy.get('button.hero-descriptor_btn.btn.btn-primary').click();
  cy.get('input#signupName').type('Veronika');
  cy.get('input#signupLastName').type('Sokolova');
  cy.get('input#signupEmail').type('wrongemail');
  cy.get('input#signupPassword').type('short', { sensitive: true }); 
  cy.get('input#signupRepeatPassword').type('different', { sensitive: true }); 

  cy.get('button.btn.btn-primary').should('be.disabled');
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
    
  // Login
    it('Should login with valid credentials via UI', () => {
  cy.login('vsokolovanika+123@gmail.com', 'Nika5432112345');
});
});