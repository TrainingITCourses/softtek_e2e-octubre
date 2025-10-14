import { RegisterPage } from "../../support/pages/register.po";

describe("The register send process", () => {
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
    cy.request("POST", "http://localhost:3000/users/test-clear");
    cy.intercept("POST", "/users/register").as("postUser");
  });
  beforeEach(() => {
    // Arrange
    registerPage.visit();
    cy.get("form").as("registerForm");
  });
  context("when the users sends the form correctly", () => {
    beforeEach(() => {
      // Act
      registerPage.getInputName().type(inputValidUser.name);
      registerPage.getInputEmail().type(inputValidUser.email);
      registerPage.getInputPassword().type(inputValidUser.password);
      registerPage
        .getInputConfirmPassword()
        .type(inputValidUser.confirmPassword);
      registerPage.getCheckboxTerms().check();
      registerPage.getSubmitButton().click();
    });
    it("should send the user and not show failed message", () => {
      // Assert
      cy.get("@postUser").its("response.statusCode").should("eq", 201);
      registerPage.getFailedMessage().should("not.exist");
    });
  });
});
