import authorization from "../pages/authorization";
import modalLogin from "../pages/modalLogin";
import garagePage from "../pages/garagePage";
import fuelPage from "../pages/fuelPage";

describe('Log in profile, creating car settings', () => {
 beforeEach('HTTP authorization', () => {
  authorization.httpAuthorization();

  modalLogin
    .clickSignInButton()
    .typeEmailInput(Cypress.env('email'))
    .typePasswordInput(Cypress.env('password'))
    .clickLogInButton();

  // check if page Garage is open
cy.contains('h1', 'Garage').should('be.visible');
   });
 
  it('Open and Login in profile "Sign in modal window"', () => {
    garagePage
      .clickAddCarButton()
      .selectCarOption('Audi')
      .selectModelOption('Q7')
      .typeMileageInput('1000')
      .clickAddButton();
  });

  it('Navigate to the "Fuel Expenses Section"', () => {
    fuelPage
      .navigateFuelExpensesSection()
      .clickAddAnExpenseButton()
      .chooseSelectCar()
      .inputStaticDate('27.08.2025')
      .addingMileage('1000')
      .addingNumbersOfLiters('150')
      .addingTotalCost('200')
      .clickAddButton();
  });
});