// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then((res) => {
    localStorage.setItem('userToken', res.body.token);
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('addBlog', (props) => {
  let header = `bearer ${localStorage.getItem('userToken')}`;
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: props,
    headers: { Authorization: header },
  }).then((res) => {
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('deleteBlogSuccess', () => {
  let blogs = [];
  let header = `bearer ${localStorage.getItem('userToken')}`;

  cy.request('GET', 'http://localhost:3001/api/blogs').then((res) => {
    blogs = res.body;
    console.log(res.body);
    cy.request({
      url: `http://localhost:3001/api/blogs/delete/${blogs[0].id}`,
      method: 'DELETE',
      body: blogs,
      headers: { Authorization: header },
    }).then((res) => {
      cy.visit('http://localhost:3000');
    });
  });
});

Cypress.Commands.add('deleteBlogWithFail', () => {
  let blogs = [];
  let header = `bearer saalkjlkj${localStorage.getItem('userToken')}`;
  console.log(header);

  cy.request('GET', 'http://localhost:3001/api/blogs').then((res) => {
    blogs = res.body;
    console.log(res.body);
    const url = `http://localhost:3001/api/blogs/delete/${blogs[0].id}`;
    console.log(url);
    cy.request({
      url: url,
      method: 'DELETE',
      body: blogs,
      headers: { Authorization: header },
      failOnStatusCode: false,
    }).then((res) => {
      cy.visit('http://localhost:3000');
    });
  });
});
