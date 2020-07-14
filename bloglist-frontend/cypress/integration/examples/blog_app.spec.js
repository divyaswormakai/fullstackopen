//dont use arrow functions cause it might cause trouble in some case
//it.only to run that case only
describe('Blog app', function () {
  beforeEach(function () {
    //resetting the database here
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: '4567',
      username: '4567',
      password: '4567',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Login');
  });

  describe('Login functionality', function () {
    it('succeeds with correct credentials', function () {
      cy.get('.username').type('4567');
      cy.get('.password').type('4567');
      cy.get('.LoginSubmit').click();
      //now login happens and now we check if the login is shown
      cy.contains('4567 is logged in.');
      cy.get('.successNotif').should('be.visible');
    });
    it('fails with wrong credentials', function () {
      cy.get('.username').type('1234');
      cy.get('.password').type('1234');
      cy.get('.LoginSubmit').click();
      //login failed case
      cy.contains('Login');
      cy.get('.errorNotif').should('contain', 'Invalid username/password');
      cy.get('.errorNotif').should(
        'have.css',
        'border-color',
        'rgb(255, 0, 0)'
      );
    });
  });
});
