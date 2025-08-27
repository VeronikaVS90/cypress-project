class GaragePage {

    // Locators of page elements
    
  get addButtonCar() {
    return cy.contains('button', 'Add car');
  }

  get selectCar() {
    return cy.get('select#addCarBrand')
  }

  get chooseModelOption() {
    return cy.get('select#addCarModel')
  }

  get mileage() {
    return cy.get('input#addCarMileage')
  }

  get buttonAdd() {
    return cy.get('ngb-modal-window .btn.btn-primary')
  }

    // Methods for interaction with elements
  
  clickAddCarButton() {
    this.addButtonCar.click();
    return this;
  }

  selectCarOption(brand) {
    this.selectCar.select(brand);
    return this;
  }

  selectModelOption(option) {
    this.chooseModelOption.select(option);
    return this;
  }
  
  typeMileageInput(text) {
    this.mileage.type(text);
    return this;
  }

  clickAddButton() {
    this.buttonAdd.click();
    return this;
  }
}

export default new GaragePage();