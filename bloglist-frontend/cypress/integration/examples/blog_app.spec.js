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
      cy.get('.errorNotif')
        .should('contain', 'Invalid username/password')
        .and('have.css', 'border-color', 'rgb(255, 0, 0)');
      cy.get('html').should('not.contain', '4567 is logged in.');
    });
  });

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.login(user);
      console.log(localStorage.getItem('userToken'));
      cy.addBlog(blog);
      cy.addBlog(blog2);
    });

    it('a new note is created', function () {
      //check if addblog btn from addblog form is seen
      //check if the blog is added
      cy.contains(blog.title);
      cy.contains(blog2.title);
    });

    it('like button works', function () {
      const blog1row = cy.contains(blog.title);
      //show details
      blog1row.parent().find('.show-details-btn').click();

      const newblog1row = cy.contains(blog.title);
      //click like btn
      newblog1row.parent().parent().find('.increase-like-btn').as('likeBtn');
      cy.get('@likeBtn').click();
      // check if the number of like increased
      newblog1row
        .parent()
        .parent()
        .find('span')
        .contains((blog.likes + 1).toString());
    });
  });
});

const user = { username: '4567', password: '4567' };
const blog = {
  title: 'Blog from cypress',
  author: 'Author from cypress',
  url: 'url from cypress',
  likes: 0,
};
const blog2 = {
  title: 'Blogggso',
  author: 'Author cypress',
  url: 'url cypress',
  likes: 0,
};