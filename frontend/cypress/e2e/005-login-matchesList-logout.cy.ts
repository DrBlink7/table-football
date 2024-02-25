/// <reference types="cypress" />
import { checkIfWeAreInLoginComponent, login, checkIfWeAreInHomeComponent, logout, checkIfSeeMatchListsIsDiplayed, clickOnMatchesList } from "./utils";

describe("login-playersList-logout-flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.intercept(
      'GET',
      '/api/match',
      {
        statusCode: 200,
        fixture: "matches.json"
      }
    )
    cy.intercept(
      'GET',
      '/api/team',
      {
        statusCode: 200,
        fixture: "teams.json"
      }
    )
  });

  it("validate actions", () => {
    cy.viewport(1440, 900).wait(500);
    checkIfWeAreInLoginComponent()
    login()
    checkIfWeAreInHomeComponent()
    clickOnMatchesList()
    checkIfSeeMatchListsIsDiplayed()
    logout()
    checkIfWeAreInLoginComponent()
  });
});


