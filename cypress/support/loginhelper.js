export const URL = {
    API_LOGIN: 'https://prod-warmachine.talent500.co/api/users/candidate/signin/',
    UI_LOGIN: 'https://talent500.co/auth/signin'
}
export const LOCATOR = {
    email:'[placeholder="Email"]',
    password:'[placeholder="Password"]',
    login:'[data-id="submit-login-btn"]'
}
export const MESSAGE = {
    INVALID_CREDENTIALS:'Unable to login',
    EMPTY_FIELD:'Please fill out this field.',
    INVALID_EMAIL : `Please include an '@' in the email address. 'withoutspecialcharactor' is missing an '@'.`
}
export const apiLogin = (email, password) => {
   return cy.request({
        method: "POST",
        url: URL.API_LOGIN,
        body: {
            email: email,
            password: password,
        },
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.include('Verified');
        return `JWT ${response.body.token}`
    });
};
export const enterFieldValue = (value, locator) => {
    if(value==""){
        cy.get(locator).clear().invoke('val',value);
    cy.wait(2000);
    }else{
        cy.get(locator).clear().type(value);
    cy.wait(2000);

    }
};
export const uiLogin = (email, password) => {
    enterFieldValue(email,LOCATOR.email)
    enterFieldValue(password,LOCATOR.password)
    cy.get(LOCATOR.login).click()

    if(email==""&&password==""){
        cy.get(`${LOCATOR.email}`).invoke('prop','validationMessage').should('equal',MESSAGE.EMPTY_FIELD)
    }else if(email==""&&password!=""){
        cy.get(`${LOCATOR.email}`).invoke('prop','validationMessage').should('equal',MESSAGE.EMPTY_FIELD)
    }else if(password==""&&email!=""){
        cy.get(`${LOCATOR.password}`).invoke('prop','validationMessage').should('equal',MESSAGE.EMPTY_FIELD)
    }else if(!email.includes('@')){
        cy.get(`${LOCATOR.email}`).invoke('prop','validationMessage').should('equal',MESSAGE.INVALID_EMAIL)
    }else{
        cy.contains(MESSAGE.INVALID_CREDENTIALS).should("exist");
    }
}
