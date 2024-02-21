/// <reference types="cypress" />
import { checkIfWeAreInLoginComponent } from "./utils";

describe("direct-access-to-other-pages", () => {

  it("access to home page", () => {
    cy.visit("http://localhost:3000/");
    cy.viewport(1440, 900).wait(500);
    checkIfWeAreInLoginComponent()
  });

  it("access to player page", () => {
    cy.visit("http://localhost:3000/player/1");
    cy.viewport(1440, 900).wait(500);
    checkIfWeAreInLoginComponent()
  });

});
