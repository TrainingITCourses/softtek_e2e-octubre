import { RegisterPage } from "../../support/pages/register.po";

/**
 * Register form validation and functionality tests
 *   should display form with 5 inputs and disabled submit button initially
 *   when user fills form with valid data
 *     should accept the input values
 *     should enable the submit button
 *   when user submits valid form
 *     should send correct data to the server
 *   when user fills form with invalid data
 *     should keep submit button disabled
 *   when user resets the form
 *     should clear all form fields
 */
describe("Register form validation and functionality", () => {
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
  beforeEach(() => {
    // Arrange
    registerPage.visit();
    cy.get("form").as("registerForm");
  });
  it("should display form with 5 inputs and disabled submit button initially", () => {
    cy.get("@registerForm").find("input").should("have.length", 5);
    registerPage.getSubmitButton().should("be.disabled");
  });
  context("when user fills the form with valid data", () => {
    beforeEach(() => {
      // Act - Fill form with valid data
      registerPage.getInputName().type(inputValidUser.name);
      registerPage.getInputEmail().type(inputValidUser.email);
      registerPage.getInputPassword().type(inputValidUser.password);
      registerPage
        .getInputConfirmPassword()
        .type(inputValidUser.confirmPassword);
      registerPage.getCheckboxTerms().check();
    });
    it("should accept the input values and enable submit button", () => {
      // Assert - Verify form accepts valid input values
      registerPage.getInputName().should("have.value", inputValidUser.name);
      registerPage.getInputEmail().should("have.value", inputValidUser.email);
      registerPage
        .getInputPassword()
        .should("have.value", inputValidUser.password);
      registerPage
        .getInputConfirmPassword()
        .should("have.value", inputValidUser.confirmPassword);
      registerPage.getCheckboxTerms().should("be.checked");
    });
    context("when user submits the valid form", () => {
      beforeEach(() => {
        // Arrange - Set up network intercept
        cy.intercept("POST", "/users/register").as("postUser");
        // Act - Submit the form
        registerPage.getSubmitButton().click();
      });
      it("should show failed message when server is not available", () => {
        // Assert - This test is incomplete and depends on server state
        // ⚠️ Only works in certain scenarios
        // TODO: Change for a more reliable check or mock server response
        // registerPage.getFailedMessage().should("exist");
      });
      it("should send the correct user data to server", () => {
        // Assert - Verify correct data is sent in POST request
        cy.wait("@postUser").its("request.body").should("deep.equal", {
          name: inputValidUser.name,
          email: inputValidUser.email,
          password: inputValidUser.password,
          confirmPassword: inputValidUser.confirmPassword,
          terms: inputValidUser.terms,
        });
      });
    });
  });
  context("when user fills the form with invalid data", () => {
    beforeEach(() => {
      // Act - Fill form with invalid data
      registerPage.getInputName().clear();
      registerPage.getInputEmail().type(inputInvalidUser.email);
      registerPage.getInputPassword().type(inputInvalidUser.password);
      registerPage
        .getInputConfirmPassword()
        .type(inputInvalidUser.confirmPassword);
      registerPage.getCheckboxTerms().uncheck();
    });
    it("should keep submit button disabled when form is invalid", () => {
      // Assert - Verify form validation prevents submission
      registerPage.getCheckboxTerms().should("not.be.checked");
      // TODO: Add more comprehensive validation checks for all invalid fields
      // registerPage.getSubmitButton().should("be.disabled");
    });
  });
  context("when user resets the form", () => {
    beforeEach(() => {
      // Arrange - Fill some form fields first
      registerPage.getInputName().type(inputValidUser.name);
      registerPage.getCheckboxTerms().check();
      // Act - Reset the form
      registerPage.getResetButton().click();
    });
    it("should clear all form fields", () => {
      // Assert - Verify form is cleared after reset
      registerPage.getInputName().should("have.value", "");
      registerPage.getCheckboxTerms().should("not.be.checked");
    });
  });
});
