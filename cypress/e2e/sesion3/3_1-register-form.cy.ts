/**
 * The register form
 *   should have a form with 5 clean inputs and a submit button disabled
 *   when the users fills the form correctly
 *     should allow to submit the form
 *      should errors not be present
 *   when the user fills the form incorrectly
 *     should disabled the submit button when start
 *     should not mark the email as invalid if it is empty, but list in error section
 *     should mark the email as invalid if it is not an email
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
});
