/*
*   test case for login page "https://talent500.co/auth/signin?redirect_to=jobs"
*/
import * as loginhelper from './support/loginhelper'
export const VALID_CREDENTIALS = {
    email: "ameedhudhud676@gmail.com",
    password: "ameed059",
};
const INVALID_CREDENTIALS = {
    email: "ameedhudhud@gmail.com",
    password: "ameed",
    wrongemail : 'ameedgmail.com'//without '@'
};
describe('Login Scenarios', () => {
    beforeEach(()=>{
        cy.visit(loginhelper.URL.UI_LOGIN)
    })
    it('login with an invalid email and valid password', () => {
        loginhelper.uiLogin(INVALID_CREDENTIALS.email, VALID_CREDENTIALS.password)
    })
    it('login with an invalid password and valid email', () => {
        loginhelper.uiLogin(VALID_CREDENTIALS.email, INVALID_CREDENTIALS.password)
    })
    it('login with only the password field filled',()=>{
        loginhelper.uiLogin("", INVALID_CREDENTIALS.password)
    })
    it('login with only the email field filled',()=>{
        loginhelper.uiLogin(VALID_CREDENTIALS.email, "")
    })
    it('login with an email that does not include the "@" symbol',()=>{
        loginhelper.uiLogin(INVALID_CREDENTIALS.wrongemail, VALID_CREDENTIALS.password)
    })
    it('login without entering email and password',()=>{
        loginhelper.uiLogin("", "")
    })
    it('login with a valid email and password', () => {
        loginhelper.apiLogin(VALID_CREDENTIALS.email, VALID_CREDENTIALS.password)
    })
})

