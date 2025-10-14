export class RegisterPage {
  visit() {
    cy.visit("user/register");
  }

  getInputName() {
    return cy.get("#name");
  }
  getInputEmail() {
    return cy.get('input[type="email"]');
  }
  getInputPassword() {
    return cy.get('input[name="password"]');
  }
  getInputConfirmPassword() {
    return cy.get('input[type="password"]').last();
  }
  getCheckboxTerms() {
    return cy.get('input[type="checkbox"]');
  }

  getSubmitButton() {
    return cy.get('button[type="submit"]');
  }
  getResetButton() {
    return cy.get('button[type="reset"]');
  }

  getErrorMessages() {
    return cy.get("#errors");
  }

  getFailedMessage() {
    return cy.get("#failed");
  }
}
