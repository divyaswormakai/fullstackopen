//dont use arrow functions cause it might cause trouble in some case
//it.only to run that case only

const user = { username: '4567', password: '4567' };
const user2 = { username: '1234', password: '1234' };
const blog = {
  title: 'Blog from cypress',
  author: 'Author from cypress',
  url: 'url from cypress',
  likes: 15,
};
const blog2 = {
  title: 'Blogggso',
  author: 'Author cypress',
  url: 'url cypress',
  likes: 5,
};
const blog3 = {
  title: 'Thirdo',
  author: 'Author cypress',
  url: 'url cypress',
  likes: 12,
};

describe('Blog app', function () {
  beforeEach(function () {
    //resetting the database here
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = { username: '4567', password: '4567', name: '4567' };
    const user2 = { username: '1234', password: '1234', name: '1234' };

    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.request('POST', 'http://localhost:3001/api/users', user2);
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
      cy.get('.username').type('456789');
      cy.get('.password').type('456789');
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
      cy.addBlog(blog3);
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

    it('deleting a blog successfully', function () {
      cy.deleteBlogSuccess();

      cy.contains(blog.title).should('not.exist');
    });

    it('deleting a blog with failure', function () {
      cy.login(user2);
      cy.deleteBlogWithFail();

      cy.contains(blog.title);
    });

    it.only('sorting of the blog is done right', function () {
      //show details of all blogs
      cy.get('.show-details-btn').click({ multiple: true });

      const blogs = [blog, blog2, blog3];
      let likes = [];
      blogs.forEach((blogElem) => {
        likes.push(parseInt(blogElem.likes));
        console.log(typeof blogElem.likes);
      });
      //sorting the likes
      let i = 0;
      for (i = 0; i < likes.length; i++) {
        let key = likes[i];
        let j = i - 1;
        while (j > 0 && key > likes[j]) {
          likes[j + 1] = likes[j];
          j -= 1;
        }
        likes[j + 1] = key;
      }
      //cheking if the first and last values are correct
      cy.get('span:first').contains(likes[0]);
      cy.get('span:last').contains(likes[likes.length - 1]);
    });
  });
});
