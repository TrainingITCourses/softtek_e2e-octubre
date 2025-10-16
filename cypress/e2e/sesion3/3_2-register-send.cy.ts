import { RegisterPage } from "../../support/pages/register.po";

/**
 * User registration API integration tests
 *  when user submits valid registration data
 *    should successfully register user with server
 *    should receive successful response (201 status)
 *  when user attempts to register with existing credentials
 *    should receive error response from server
 *    should display failure message to user
 */
describe("User registration API integration", () => {
  const inputUser = {
    name: "Coyote",
    email: "coyote@acme.com",
    password: "1234abcD!",
    confirmPassword: "1234abcD!",
    terms: true,
  };
  const registerPage = new RegisterPage();
  before(() => {
    // Setup - Clear test data before running registration tests
    cy.request("POST", "http://localhost:3000/users/test-clear");
  });
  beforeEach(() => {
    // Arrange - Setup page and network intercepts
    registerPage.visit();
    cy.get("form").as("registerForm");
    cy.intercept("POST", "**/users/register").as("postUsersRegister");
  });
  context("when user submits valid registration data", () => {
    beforeEach(() => {
      // Act - Fill and submit form with valid user data
      registerPage.getInputName().type(inputUser.name);
      registerPage.getInputEmail().type(inputUser.email);
      registerPage.getInputPassword().type(inputUser.password);
      registerPage.getInputConfirmPassword().type(inputUser.confirmPassword);
      registerPage.getCheckboxTerms().check();
      registerPage.getSubmitButton().click();
    });
    it("should successfully register user and receive confirmation", () => {
      // Assert - Verify successful registration response
      cy.wait("@postUsersRegister")
        .its("response.statusCode")
        .should("eq", 201);
      registerPage.getFailedMessage().should("not.exist");
    });
  });
  context("when user attempts to register with existing credentials", () => {
    // ⚠️ Only works in certain scenarios
    // This text depends on previous test to have created the user
    it("should receive error response and display failure message", () => {
      // ToDo: duplicate user creation to ensure test reliability
      // Arrange & Act - Submit registration with already existing user data
      registerPage.getInputName().type(inputUser.name);
      registerPage.getInputEmail().type(inputUser.email);
      registerPage.getInputPassword().type(inputUser.password);
      registerPage.getInputConfirmPassword().type(inputUser.confirmPassword);
      registerPage.getCheckboxTerms().check();
      registerPage.getSubmitButton().click();

      // Assert - Verify error response and failure message display
      cy.wait("@postUsersRegister")
        .its("response.statusCode")
        .should("be.above", 400);
      cy.get("section#failed").should("be.visible");
    });
  });
});
