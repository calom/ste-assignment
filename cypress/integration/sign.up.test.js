import { ROUTES } from "../constants";

describe('', () => {
    beforeEach(() => {
        cy.visit(ROUTES.REGISTER)
    })


    it('Page check', () => {
        cy.contains('h1', 'Sign up')
        cy.contains('Have an account?').should('have.attr', 'href', '#/login')
        cy.get('[type="submit"]').should('be.disabled').should('contain.text', 'Sign up')
    });

    it('Successful sign up', () => {
        cy.intercept('POST', /users$/, { fixture: 'user.calo.json' }).as('registerRequest')
        cy.get('[type="text"]').type('calom')
        cy.get('[type="email"]').type('calo@gmail.com')
        cy.get('[type="password"]').type('password1')

        cy.get('[type="submit"]').click()

        cy.wait('@registerRequest')
        cy.url().should('contains', '\/\#/')
    });

    it('Check error messages when signing up with already registered username and email', () => {
        cy.intercept('POST', /users/, {
            statusCode: 422,
            body: { errors: { email: ['has already been taken'], username: ['has already been taken'] } },
        }).as('registerRequest')


        cy.visit(ROUTES.REGISTER)

        cy.get('[placeholder="Your Name"]').type('whatever')
        cy.get('[placeholder="Email"]').type('noway@example.com')
        cy.get('[placeholder="Password"]').type('12345678')

        cy.get('[type="submit"]').click()

        cy.wait('@registerRequest')
        cy.contains('email has already been taken')
        cy.contains('username has already been taken')
    })

    it('Check hints', () => {
        cy.get('[placeholder="Your Name"]').type('whatever')
        cy.get('[placeholder="Email"]').type('noway@')
        cy.get('[placeholder="Password"]').type('12345678')

        cy.get('[type="submit"]').click()

        // Cant figure out yet how to check 'popUp' hint
    });
})