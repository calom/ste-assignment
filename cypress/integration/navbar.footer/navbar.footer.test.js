import { ROUTES } from "../../constants";

describe('Navigation bar and footer elements check', () => {
    it('Check header and footer are present when jumping between Home, Sign In and Sign Up page', () => {
        cy.visit(ROUTES.HOME)
        cy.headerAndFooterCheck()

        cy.visit(ROUTES.REGISTER)
        cy.headerAndFooterCheck()
        
        cy.visit(ROUTES.LOGIN)
        cy.headerAndFooterCheck()
    })
});