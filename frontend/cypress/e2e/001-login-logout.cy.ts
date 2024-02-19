/// <reference types="cypress" />
import { checkIfWeAreInLoginComponent, login, checkIfWeAreInHomeComponent, logout } from "./utils";

describe("login-logout-flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("validate actions", () => {
    cy.viewport(1440, 900).wait(500);
    checkIfWeAreInLoginComponent()
    login()
    checkIfWeAreInHomeComponent()
    logout()
    checkIfWeAreInLoginComponent()
  });
});


