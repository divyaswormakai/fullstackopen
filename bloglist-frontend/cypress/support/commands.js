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
    console.log(res.body.token);
  });
});

Cypress.Commands.add('addBlog', (props) => {
  let header = `bearer ${localStorage.getItem('userToken')}`;
  console.log(props);
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: props,
    headers: { Authorization: header },
  }).then((res) => {
    console.log(res);
    cy.visit('http://localhost:3000');
  });
});
