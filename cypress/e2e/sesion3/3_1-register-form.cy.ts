/**
 * The register form
 *   should have a form with 5 clean inputs and a submit button disabled
 *   when the users fills the form correctly
 *     should allow to submit the form
 *      should errors not be present
 *   when the user fills the form incorrectly
 *     should disabled the submit button
 *     should show error messages for each invalid input
 *   when the user resets the form
 *     should clear the form when the reset button is clicked
 */
describe("The register form", () => {
  beforeEach(() => {
    // Arrange
    cy.visit("user/register");
    cy.get("form").as("registerForm");
  });
  it("should have a form with 5 clean inputs and a submit button disabled", () => {
    cy.get("@registerForm").find("input").should("have.length", 5);
    cy.get("@registerForm").find('button[type="submit"]').should("be.disabled");
  });
  context("when the users fills the form correctly", () => {
    beforeEach(() => {
      // Act
      cy.get("#name").type("Coyote");
      cy.get("@registerForm")
        .find('input[type="email"]')
        .type("coyote@acme.com");
      cy.get("@registerForm").find('input[name="password"]').type("1234abcD!");
      cy.get("@registerForm")
        .find('input[type="password"]')
        .last()
        .type("1234abcD!");
      cy.get("@registerForm").find("input").last().check();
    });
    it("should allow to submit the form and errors not present", () => {
      // Assert
      cy.get('[type="submit"]').should("be.enabled");
      cy.get("#errors").should("not.exist");
    });
  });
  context("when the users fills the form incorrectly", () => {
    beforeEach(() => {
      // Act
      cy.get("#name").clear();
      cy.get("@registerForm").find('input[type="email"]').type("coyote.com");
      cy.get("@registerForm").find('input[name="password"]').type("1234");
      cy.get("@registerForm")
        .find('input[type="password"]')
        .last()
        .type("abcD!");
      cy.get("@registerForm").find("input").last().uncheck();
    });
    it("should disabled the submit button and show error messages for each invalid input", () => {
      // Assert
      cy.get('[type="submit"]').should("be.disabled");
      cy.get("#errors").should("exist");
    });
  });
  context("when the user resets the form", () => {
    beforeEach(() => {
      // Arrange
      cy.get("#name").type("Coyote");
      cy.get("@registerForm").find("input").last().check();
      // Act
      cy.get("@registerForm").find('button[type="reset"]').click();
    });
    it("should clear the form when the reset button is clicked", () => {
      // Assert
      cy.get("#name").should("have.value", "");
      cy.get("@registerForm").find("input").last().should("not.be.checked");
    });
  });
});
