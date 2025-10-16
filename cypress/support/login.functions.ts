export function login() {
  loginAs("coyote");
}

export function loginAs(alias: string) {
  cy.fixture(`${alias}-credentials`).then((x) => {
    loginWith(x.email, x.password);
  });
}

export function loginWith(email: string, password: string) {
  cy.visit("user/login");
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get("button").contains("Login").click();
}
