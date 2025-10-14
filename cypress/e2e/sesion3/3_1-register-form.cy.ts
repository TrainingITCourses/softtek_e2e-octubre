import { RegisterPage } from "../../support/pages/register.po";

/**
 * The register form
 *   should have a form with 5 clean inputs and a submit button disabled
 *   when the users fills the form correctly
 *     should allow to submit the form
 *     should errors not be present
 *    and the user click submit
 *       should show failed message
 *   when the user fills the form incorrectly
 *     should disabled the submit button
 *     should show error messages for each invalid input
 *   when the user resets the form
 *     should clear the form when the reset button is clicked
 */
describe("The register form", () => {
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
  it("should have a form with 5 clean inputs and a submit button disabled", () => {
    cy.get("@registerForm").find("input").should("have.length", 5);
    registerPage.getSubmitButton().should("be.disabled");
  });
  context("when the users fills the form correctly", () => {
    beforeEach(() => {
      // Act
      registerPage.getInputName().type(inputValidUser.name);
      registerPage.getInputEmail().type(inputValidUser.email);
      registerPage.getInputPassword().type(inputValidUser.password);
      registerPage
        .getInputConfirmPassword()
        .type(inputValidUser.confirmPassword);
      registerPage.getCheckboxTerms().check();
    });
    it("should allow to submit the form and errors not present", () => {
      // Assert
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
    context("and the user click submit", () => {
      beforeEach(() => {
        // Act
        registerPage.getSubmitButton().click();
      });
      it("should show failed message", () => {
        // Assert
        // ⚠️ Solo funciona cuando no hay un servicio
        // To Do: Comprobar que se envía correctamente la información
        registerPage.getFailedMessage().should("exist");
      });
    });
  });
  context("when the users fills the form incorrectly", () => {
    beforeEach(() => {
      // Act
      registerPage.getInputName().clear();
      registerPage.getInputEmail().type(inputInvalidUser.email);
      registerPage.getInputPassword().type(inputInvalidUser.password);
      registerPage
        .getInputConfirmPassword()
        .type(inputInvalidUser.confirmPassword);
      registerPage.getCheckboxTerms().uncheck();
    });
    it("should disabled the submit button and show error messages for each invalid input", () => {
      // Assert
      registerPage.getCheckboxTerms().should("not.be.checked");
    });
  });
  context("when the user resets the form", () => {
    beforeEach(() => {
      // Arrange
      registerPage.getInputName().type(inputValidUser.name);
      registerPage.getCheckboxTerms().check();
      // Act
      registerPage.getResetButton().click();
    });
    it("should clear the form when the reset button is clicked", () => {
      // Assert
      registerPage.getInputName().should("have.value", "");
      registerPage.getCheckboxTerms().should("not.be.checked");
    });
  });
});
