// Demonstrate the
// use of fixtures for stubbing network responses
// use of commands for reusable logic

/**
 * User login process
 *  when server responds with valid credentials
 *    should redirect to user page
 *    should save user data in local storage
 *  when server responds with Bad Request
 *    should display failure message to user
 */
describe("User login process", () => {
  beforeEach(() => {
    // Arrange
    cy.clearLocalStorage();
  });
  context.only("when server responds with valid credentials", () => {
    beforeEach(() => {
      // Arrange
      const API_BASE_URL = Cypress.env("apiBaseUrl");
      cy.intercept("POST", `${API_BASE_URL}/users/login`, {
        statusCode: 201,
        fixture: "coyote-user-token",
      }).as("postUserLogin");
      // Act
      cy.stk_loginAs("coyote");
    });
    it("should redirect to user page and save user data in local storage", () => {
      // Assert
      cy.url().should("include", "/user/");
      cy.window()
        .its("localStorage")
        .invoke("getItem", "global")
        .should("contain", "Coyote");
    });
  });
  context("when server responds with Bad Request", () => {
    it("should display failure message to user", () => {});
  });
});
