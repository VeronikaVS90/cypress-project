// overwrite
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
        // turn off original log
        options.log = false
        // create our own log with masked message
        Cypress.log({
            $el: element,
            name: 'type',
            message: '*'.repeat(text.length),
        })
    }

    return originalFn(element, text, options)
});

// custom command for login
Cypress.Commands.add('login', (email, password) => {
  cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
 // open login form
  cy.contains('Sign In').click();

  // expect for the form
  cy.get('#signinEmail').should('be.visible');

  // to input creds
  cy.get('#signinEmail').type(email);
  cy.get('#signinPassword').type(password, { sensitive: true });

  // check tgat the login button exists and click on it
cy.get('button.btn.btn-primary')
  .contains('Login')
  .should('be.visible')
  .click();


  // check that we are in the panel
  cy.url().should('include', 'panel/garage');
});

