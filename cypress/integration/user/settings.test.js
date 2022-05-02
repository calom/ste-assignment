import { ROUTES } from '../../constants'

describe('Checking settings page', () => {
    // beforeEach(() => {
    //     cy.loginApi();  //not sure why this is not working fully. Surely some little detail is missing 
    // })

    // This test fails, I am missing something for full login
    it('Check greetings Your Settings ', () => {
        //I tried to intercept tags call which fails to be fetched at this point and seems I dont fully understand why or how it works exactly, leaving it for discussion         
        // cy.intercept(
        //     'GET', 
        //     '/api/tags', 
        //     {statusCode: 200, body: {"tags":["welcome","implementations","codebaseShow","introduction"]}}).as('getTags')
        cy.login();  
        cy.visit(ROUTES.SETTINGS)    
        // cy.wait('@getTags')

        cy.contains('h1', 'Your Settings')
        cy.get('[type="text"]').should('contain', 'plumrx')

        cy.contains('Have an account?').should('have.attr', 'href', '/'+ROUTES.LOGIN)
    })
})