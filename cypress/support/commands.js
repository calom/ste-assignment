// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { ROUTES } from '../constants'


Cypress.Commands.add('login', (username = 'calo') => {
  cy.fixture('user.calo.json').then(authResponse => {
    authResponse.user.username = username
    cy.intercept('POST', /users\/login$/, { statusCode: 200, body: authResponse })
  })

  // click sign in button in home page
  cy.visit(ROUTES.LOGIN)

  cy.get('[type="email"]').type('foo@example.com')
  cy.get('[type="password"]').type('12345678')
  cy.get('[type="submit"]').contains('Sign in').click()

  cy.url().should('match', /#\/$/)
})

Cypress.Commands.add('loginApi', (username = 'calo') => {
  // OK found out this will not work, since I am not making this request directly from app, but with request.
  cy.fixture('user.calo.json').then(authResponse => {
    authResponse.user.username = username
    cy.intercept('POST', /users\/login$/, { statusCode: 200, body: authResponse })
  })

  cy.request({
    method: 'POST',
    url: 'https://api.realworld.io/api/users/login',
    body: {
      user: {
        email: 'calo@gmail.com', password: '12345678'
      }
    }
  })
    .then((resp) => {
      window.localStorage.setItem("jwt", resp.body.user.token)
    })
})

Cypress.Commands.add('headerAndFooterCheck', () => {
  cy.contains('conduit').should('have.attr', 'href', ROUTES.HOME)
  cy.contains('Home').should('have.attr', 'href', ROUTES.HOME)
  cy.contains('Sign in').should('have.attr', 'href', ROUTES.LOGIN)
  cy.contains('Sign up').should('have.attr', 'href', ROUTES.REGISTER)

  cy.get('footer').should('exist').within(() => {
    cy.contains('conduit').should('have.attr', 'href', ROUTES.HOME)
    cy.contains('Thinkster').should('have.attr', 'href', 'https://thinkster.io')
    cy.contains('Real world app').should('have.attr', 'href', 'https://github.com/mutoe/vue3-realworld-example-app')
  })
})
