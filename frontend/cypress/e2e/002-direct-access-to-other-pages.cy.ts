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

  it("access to team page", () => {
    cy.visit("http://localhost:3000/team/1");
    cy.viewport(1440, 900).wait(500);
    checkIfWeAreInLoginComponent()
  });

  it("access to match page", () => {
    cy.visit("http://localhost:3000/match/1");
    cy.viewport(1440, 900).wait(500);
    checkIfWeAreInLoginComponent()
  });

});
