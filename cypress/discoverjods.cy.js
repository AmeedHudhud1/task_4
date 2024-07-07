/*
*   test case for discoverjobs page "https://talent500.co/jobs"
*/
import { apiLogin,enterFieldValue } from "./support/loginhelper";
import * as discoverjobhelper from "./support/discoverjobshelper";
import { VALID_CREDENTIALS } from "./login.cy";
let cookie;

describe("Job Filtering and Discovery", () => {
  before(() => {
    apiLogin(VALID_CREDENTIALS.email, VALID_CREDENTIALS.password).then(
      (cookies) => {
        cookie = cookies;
      }
    );
  });
  beforeEach(() => {
    cy.setCookie("authToken", cookie);
    cy.visit("https://talent500.co/jobs");
    cy.wait(3000);
  });
  it("Filter jobs by selecting a specific skill", () => {
    enterFieldValue(discoverjobhelper.INFORMATION.SKILLS.VALID_SKILL,discoverjobhelper.LOCATORS.inputFieldSkills);
    discoverjobhelper.clickButton(discoverjobhelper.LOCATORS.searchButton,true)
    discoverjobhelper.redirectToInformationPage(discoverjobhelper.LOCATORS.firstJob);
    discoverjobhelper.verifyInformationExistance([{name:discoverjobhelper.INFORMATION.SKILLS.VALID_SKILL,exist:true}]);
  });
  it("Filter jobs by selecting a company name", () => {
    discoverjobhelper.selectFromMenu(discoverjobhelper.LOCATORS.companiesMenu,discoverjobhelper.INFORMATION.COMPANY.withJob.name)
    discoverjobhelper.redirectToInformationPage(discoverjobhelper.LOCATORS.firstJob);
    discoverjobhelper.verifyInformationExistance([{name:discoverjobhelper.INFORMATION.COMPANY.withJob.name,exist:true}]);
  });
  it.only("Filter jobs by specifying a range of experience", () => {
    discoverjobhelper.selectFromMenu(discoverjobhelper.LOCATORS.experienceRangeMenu,discoverjobhelper.INFORMATION.EXPERIENCE.RANGE1);
    discoverjobhelper.redirectToInformationPage(discoverjobhelper.LOCATORS.firstJob);
    discoverjobhelper.verifyExperience(discoverjobhelper.INFORMATION.EXPERIENCE.RANGE1)

  });
  it("Filter jobs by selecting a job location", () => {
    enterFieldValue(discoverjobhelper.INFORMATION.LOCATION.withJob.name,discoverjobhelper.LOCATORS.inputFieldLocation);
    discoverjobhelper.redirectToInformationPage(discoverjobhelper.LOCATORS.firstJob);
    discoverjobhelper.verifyInformationExistance([{name:discoverjobhelper.INFORMATION.LOCATION.withJob.name,exist:true}]);
  });
  it("Verify filtered jobs by selecting skill, company name, experience range, and job location", () => {
    enterFieldValue(discoverjobhelper.INFORMATION.SKILLS.VALID_SKILL,discoverjobhelper.LOCATORS.inputFieldSkills);
    discoverjobhelper.selectFromMenu(discoverjobhelper.LOCATORS.companiesMenu,discoverjobhelper.INFORMATION.COMPANY.withJob.name)
    discoverjobhelper.selectFromMenu(discoverjobhelper.LOCATORS.experienceRangeMenu,discoverjobhelper.INFORMATION.EXPERIENCE.RANGE1)
    enterFieldValue(discoverjobhelper.INFORMATION.LOCATION.withJob.name,discoverjobhelper.LOCATORS.inputFieldLocation);
    discoverjobhelper.clickButton(discoverjobhelper.LOCATORS.searchButton,true)
    discoverjobhelper.redirectToInformationPage(discoverjobhelper.LOCATORS.firstJob)
    discoverjobhelper.verifyInformationExistance([{name:discoverjobhelper.INFORMATION.SKILLS.VALID_SKILL,exist:true},{name:discoverjobhelper.INFORMATION.COMPANY.withJob.name,exist:true},{name:discoverjobhelper.INFORMATION.LOCATION.withJob.name,exist:true}]);
    discoverjobhelper.verifyExperience(discoverjobhelper.INFORMATION.EXPERIENCE.RANGE1)
  });
  it("Filter jobs by choosing remote job option", () => {
    discoverjobhelper.clickButton(discoverjobhelper.LOCATORS.remote)
    discoverjobhelper.redirectToInformationPage(discoverjobhelper.LOCATORS.firstJob)
    discoverjobhelper.verifyInformationExistance([{name:discoverjobhelper.INFORMATION.REMOTE.NAME,exist:true}]);
  });
  it("Verify jobs list updates when returning from remote job filter",()=>{
    discoverjobhelper.clickButton(discoverjobhelper.LOCATORS.remote)
    discoverjobhelper.clickButton(discoverjobhelper.LOCATORS.remote)
    discoverjobhelper.verifyInformationExistance([{name:discoverjobhelper.INFORMATION.REMOTE.NAME,exist:false}]);
  })
  it("Filter companies by entering a valid company name", () => {
    discoverjobhelper.clickButton(discoverjobhelper.LOCATORS.companiesMenu)
    enterFieldValue(discoverjobhelper.INFORMATION.COMPANY.withJob.name,discoverjobhelper.LOCATORS.inputFieldCompany)
    discoverjobhelper.verifyCompanyExistance(discoverjobhelper.INFORMATION.COMPANY.withJob.name)
  });
  it('Verify no companies are returned when filtering by an invalid company name',()=>{
    discoverjobhelper.clickButton(discoverjobhelper.LOCATORS.companiesMenu)
    enterFieldValue(discoverjobhelper.INFORMATION.COMPANY.withoutJob.name,discoverjobhelper.LOCATORS.inputFieldCompany)
    discoverjobhelper.verifyCompanyExistance(discoverjobhelper.INFORMATION.COMPANY.withoutJob.invalidName,false)
  })
  it("Filte jobs with a company that has no jobs",()=>{
    discoverjobhelper.selectFromMenu(discoverjobhelper.LOCATORS.companiesMenu,discoverjobhelper.INFORMATION.COMPANY.withoutJob.name)
    discoverjobhelper.verifyTextExist(discoverjobhelper.MESSAGE.NO_JOB)
  })
  it("Filter jobs with a skill that has no jobs",()=>{
    enterFieldValue(discoverjobhelper.INFORMATION.SKILLS.INVALID_SKILL,discoverjobhelper.LOCATORS.inputFieldSkills);
    discoverjobhelper.clickButton(discoverjobhelper.LOCATORS.searchButton,true)
    discoverjobhelper.verifyTextExist(discoverjobhelper.MESSAGE.NO_JOB)
  })
  it("Filter jobs with a job location that has no jobs",()=>{
    enterFieldValue(discoverjobhelper.INFORMATION.LOCATION.withoutJob.name,discoverjobhelper.LOCATORS.inputFieldLocation);
    discoverjobhelper.verifyTextExist(discoverjobhelper.MESSAGE.NO_JOB)
  })
});
