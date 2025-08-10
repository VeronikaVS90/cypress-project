describe('JSONPlaceholder API Tests', () => {
  it('should get a list of posts', () => {
    cy.request('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length(100);
      });
  });

  it('should create a new post', () => {
    cy.request('POST', 'https://jsonplaceholder.typicode.com/posts', {
      title: 'Cypress test post',
      body: 'This is a post created during Cypress testing.',
      userId: 1
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.include({
        title: 'Cypress test post',
        body: 'This is a post created during Cypress testing.',
        userId: 1
      });
    });
  });
});
