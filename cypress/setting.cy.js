/*
*   test case for setting page "https://talent500.co/account-settings"
*/
import { apiLogin,enterFieldValue } from "./support/loginhelper";
import {VALID_CREDENTIALS} from "../cypress/login.cy";
import { clickButton } from "./support/discoverjobshelper";
import * as settinghelper from "./support/settinghelper"
let cookie
const NEW_CREDENTIALS = {
    email : 'ameedhudhud2003@gmail.com',
    password : 'ameed059',
    shortPassword : '123',
    mismatchedPassword : 'ameed'
}
describe('Account Settings Functionality',()=>{
    before(()=>{
        apiLogin(VALID_CREDENTIALS.email, VALID_CREDENTIALS.password).then((cookies)=>{
            cookie=cookies
        });
    })
    beforeEach(()=>{
        cy.setCookie('authToken', cookie);
        cy.visit('https://talent500.co/account-settings', { timeout: 3000 });
        // cy.wait(3000)
    })
    it('Verify the label displays the correct email of the logged-in user',()=>{
        settinghelper.verifyFromText(settinghelper.LOGIN,VALID_CREDENTIALS.email)
    })
    it('Verify that the user is unable to change the password with a old mismatched password',()=>{
        clickButton(settinghelper.CHANGE_PASSWORD,true)
        enterFieldValue(NEW_CREDENTIALS.mismatchedPassword,settinghelper.LOCATORS.oldPasswordField)
        enterFieldValue(NEW_CREDENTIALS.password,settinghelper.LOCATORS.newPasswordField)
        enterFieldValue(NEW_CREDENTIALS.password,settinghelper.LOCATORS.confirmPasswordField)
        clickButton(settinghelper.SAVE_PASSWORD,true)
        settinghelper.verifyMessage(settinghelper.MESSAGE.mismatchOldPassword)
    })
    it('Verify that the user is unable to change the password with a new, mismatched password',()=>{
        clickButton(settinghelper.CHANGE_PASSWORD,true)
        enterFieldValue(VALID_CREDENTIALS.password,settinghelper.LOCATORS.oldPasswordField)
        enterFieldValue(NEW_CREDENTIALS.password,settinghelper.LOCATORS.newPasswordField)
        enterFieldValue(`${NEW_CREDENTIALS.password}00` ,settinghelper.LOCATORS.confirmPasswordField)
        clickButton(settinghelper.SAVE_PASSWORD,true)
        settinghelper.verifyMessage(settinghelper.MESSAGE.mismatchNewPassword)
    })
    it('Verify that the user is unable to change the password with a new, mismatched password',()=>{
        clickButton(settinghelper.CHANGE_PASSWORD,true)
        enterFieldValue(VALID_CREDENTIALS.password,settinghelper.LOCATORS.oldPasswordField)
        enterFieldValue(VALID_CREDENTIALS.password,settinghelper.LOCATORS.newPasswordField)
        enterFieldValue(VALID_CREDENTIALS.password,settinghelper.LOCATORS.confirmPasswordField)
        clickButton(settinghelper.SAVE_PASSWORD,true)
        settinghelper.verifyMessage(settinghelper.MESSAGE.samePassword)
    })

    it('Verify that the user is unable to change the password with a new password of less than 8 characters',()=>{
        clickButton(settinghelper.CHANGE_PASSWORD,true)
        enterFieldValue(VALID_CREDENTIALS.password,settinghelper.LOCATORS.oldPasswordField)
        enterFieldValue(NEW_CREDENTIALS.shortPassword,settinghelper.LOCATORS.newPasswordField)
        enterFieldValue(NEW_CREDENTIALS.shortPassword ,settinghelper.LOCATORS.confirmPasswordField)
        clickButton(settinghelper.SAVE_PASSWORD,true)
        settinghelper.verifyMessage(settinghelper.MESSAGE.shortPassword)
    })
    it('Verify user ability to change password',()=>{
        clickButton(settinghelper.CHANGE_PASSWORD,true)
        enterFieldValue(VALID_CREDENTIALS.password,settinghelper.LOCATORS.oldPasswordField)
        enterFieldValue(VALID_CREDENTIALS.password,settinghelper.LOCATORS.oldPasswordField)
        enterFieldValue(NEW_CREDENTIALS.password,settinghelper.LOCATORS.newPasswordField)
        enterFieldValue(NEW_CREDENTIALS.spassword ,settinghelper.LOCATORS.confirmPasswordField)
        cy.contains(settinghelper.MESSAGE.changePassword).should('exist')
    })
    it('Verify user ability to change email',()=>{
        settinghelper.changeEmail(NEW_CREDENTIALS.email,NEW_CREDENTIALS.password,x)
    })
})

