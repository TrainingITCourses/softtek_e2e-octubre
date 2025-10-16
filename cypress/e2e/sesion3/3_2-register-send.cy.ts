import { RegisterPage } from "../../support/pages/register.po";

/**
 * User registration API integration tests
 *  when user submits valid registration data
 *    should successfully register user with server
 *    should receive successful response (201 status)
 *    should not display error messages
 *  when user attempts to register with existing credentials
 *    should receive error response from server
 *    should display failure message to user
 */
describe("User registration API integration", () => {
  const inputValidUser = {
    name: "Coyote",
    email: "coyote@acme.com",
    password: "1234abcD!",
    confirmPassword: "1234abcD!",
    terms: true,
  };
  const inputInvalidUser = {
    name: "",
    email: "coyote.com",
    password: "1234",
    confirmPassword: "abcD!",
    terms: false,
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
      registerPage.getInputName().type(inputValidUser.name);
      registerPage.getInputEmail().type(inputValidUser.email);
      registerPage.getInputPassword().type(inputValidUser.password);
      registerPage
        .getInputConfirmPassword()
        .type(inputValidUser.confirmPassword);
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
    it("should receive error response and display failure message", () => {
      // Arrange & Act - Submit registration with already existing user data
      registerPage.getInputName().type(inputValidUser.name);
      registerPage.getInputEmail().type(inputValidUser.email);
      registerPage.getInputPassword().type(inputValidUser.password);
      registerPage
        .getInputConfirmPassword()
        .type(inputValidUser.confirmPassword);
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
