class Authorization {
  // locators of page elements
  httpAuthorization() {
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
  }
}

export default new Authorization();