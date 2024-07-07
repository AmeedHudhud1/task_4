export const LOCATORS = {
    oldPasswordField : '[placeholder="old password"]',
    newPasswordField : '[placeholder="new password"]',
    confirmPasswordField : '[placeholder="confirm password"]',
    Button : 'button'
}
export const LOGIN = 'Logged in as'
export const CHANGE_PASSWORD = 'Change Password'
export const SAVE_PASSWORD = 'Save'

export const MESSAGE = {
    mismatchOldPassword : 'The password you entered is incorrect. Please try again.',
    mismatchNewPassword : 'Password Mismatch',
    shortPassword : 'Ensure this field has at least 8 characters.',
    changePassword : 'Join our network of 1.6 million+ professionals and access curated roles designed for global centers.',
    samePassword : 'Old and new passwords cannot be the same'
}
export const verifyMessage = (message) => {
    cy.get('#root').should('contain',message)
}
export const changeEmail = (email,password,auth) => {
    cy.request({
        method: "POST",
        url: 'https://prod-warmachine.talent500.co/api/users/change_email/',
        body: {
            email: email,
            password: password,
        },
        headers: {
            "Content-Type": "application/json",
            "Authorization": auth
        },
    }).then((response) => {
        expect(response.body).to.include('Verification email sent');
    });
} 
export const verifyFromText = (place,text) => {
    cy.contains(place).siblings().should('contain',text)
}