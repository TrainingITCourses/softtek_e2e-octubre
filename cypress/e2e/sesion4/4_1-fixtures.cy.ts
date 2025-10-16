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
  context.only("when server responds with valid credentials", () => {
    it("should redirect to user page and save user data in local storage", () => {
      const API_BASE_URL = Cypress.env("apiBaseUrl");
      cy.intercept("POST", `${API_BASE_URL}/users/login`, {
        fixture: "coyote-user-token",
      }).as("postUserLogin");
      cy.visit("user/login");
      cy.fixture("coyote-credentials").then((x) => {
        cy.get("#email").type(x.email);
        cy.get("#password").type(x.password);
      });
      cy.get("button").contains("Login").click();
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
