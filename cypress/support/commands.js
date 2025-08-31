Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');
  cy.get('#user-name').type(username);
  cy.get('#password').type(password);
  cy.get('#login-button').click();
});

Cypress.Commands.add('createExpense', (carId, mileage, liters, totalCost, date = new Date().toISOString().split('T')[0]) => {
  cy.getCookie('sid').then((cookie) => {
    return cy.request({
      method: 'POST',
      url: '/api/expenses',
      headers: {
        Cookie: `sid=${cookie.value}`
      },
      body: { 
        carId,
        reportedAt: date,
        mileage,
        liters,
        totalCost
      }
    });
  });
});


