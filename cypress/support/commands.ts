/// <reference types="cypress" />

import { login, loginAs, loginWith } from "./login.functions";

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      stk_login(): Chainable<void>;
      stk_loginAs(alias: string): Chainable<void>;
      stk_loginWith(email: string, password: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("stk_login", login);

Cypress.Commands.add("stk_loginAs", loginAs);

Cypress.Commands.add("stk_loginWith", loginWith);
