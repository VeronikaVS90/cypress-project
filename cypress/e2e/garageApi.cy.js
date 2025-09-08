import authorization from "../pages/authorization";
import modalLogin from "../pages/modalLogin";
import garagePage from "../pages/garagePage";
import fuelPage from "../pages/fuelPage";

describe('Log in profile, creating car settings', () => {
    beforeEach('HTTP authorization', () => {
        cy.intercept("POST", "**/api/auth/signin").as("signin");
        authorization.httpAuthorization();

        modalLogin
            .clickSignInButton()
            .typeEmailInput(Cypress.env('email'))
            .typePasswordInput(Cypress.env('password'),)
            .clickLogInButton();

        cy.wait("@signin").its("response.statusCode").should("eq", 200);
        cy.getCookie("sid").should("exist");
    });

    it('Create a car via UI and validate response', () => {
        cy.intercept('POST', '**/api/cars').as('createCar');

        garagePage
            .clickAddCarButton()
            .selectCarOption('Audi')
            .selectModelOption('Q7')
            .typeMileageInput(1000)
            .clickAddButton();

        cy.wait('@createCar').then((interception) => {
            expect(interception.response?.statusCode).to.eq(201);

            const carId = interception.response.body.data.id;
            cy.log('Created car ID:', carId);

            cy.writeFile('cypress/fixtures/carGarage.json', {
                id: carId,
                brand: 'Audi',
                model: 'Q7',
                mileage: 1000
            });

            cy.readFile('cypress/fixtures/carGarage.json').then((createdCar) => {
                cy.request('GET', '/api/cars').then((response) => {
                    expect(response.status).to.eq(200);

                    const foundCar = response.body.data.find(c => c.id === createdCar.id);
                    expect(foundCar).to.exist;
                    expect(foundCar.brand).to.eq(createdCar.brand);
                    expect(foundCar.model).to.eq(createdCar.model);
                    expect(foundCar.mileage).to.eq(createdCar.mileage);
                });
            });
        });
    });

    it('Create expense for existing car via API', () => {
        cy.readFile('cypress/fixtures/carGarage.json').then((createdCar) => {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`; 

            cy.createExpense(createdCar.id, 1200, 150, 200, formattedDate)
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.status).to.eq('ok');

                    const expense = response.body.data;
                    expect(expense).to.have.property('id');
                    expect(expense.carId).to.eq(createdCar.id);
                    expect(expense.mileage).to.eq(1200);
                    expect(expense.liters).to.eq(150);
                    expect(expense.totalCost).to.eq(200);
                });
        });
    });

    it('Add expense via UI for created car', () => {
        fuelPage
            .navigateFuelExpensesSection()
            .clickAddAnExpenseButton()
            .chooseSelectCar('Audi Q7')
            .inputStaticDate('01.09.2025')  
            .addingMileage('1200')
            .addingNumbersOfLiters('150')
            .addingTotalCost('200')
            .clickAddButton();
    });

    it('Validate created expense via UI in "Fuel Expenses Section"', () => {
        cy.readFile('cypress/fixtures/carGarage.json').then((createdCar) => {
            const mileage = 1200;
            const liters = 150;
            const totalCost = 200;

            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            const formattedDate = `${day}.${month}.${year}`; 

            fuelPage.navigateFuelExpensesSection();

            cy.get('#carSelectDropdown').click();
            cy.contains('.car-select-dropdown_item', 'Audi Q7').click({ force: true });

            cy.wait(1200); 

            cy.get('table')
                .find('tr')
                .contains('td.font-weight-bold', formattedDate)
                .should('exist')
                .parent()
                .within(() => {
                    cy.get('td').eq(1).should('contain', mileage);
                    cy.get('td').eq(2).should('contain', `${liters}L`);
                    cy.get('td').eq(3).should('contain', `${totalCost}.00 USD`);
                });
        });
    });
});



