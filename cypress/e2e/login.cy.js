describe('SauceDemo Login Test', () => {
    beforeEach(() => {  
    cy.visit('https://www.saucedemo.com/');
  });

  it('logs in successfully', () => {
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // check if user is in the inventory page
    cy.url().should('include', '/inventory.html');
      cy.contains('Products').should('be.visible');
  });
    
   
});




