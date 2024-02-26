/// <reference types="cypress" />
import { checkIfWeAreInLoginComponent, login, checkIfWeAreInHomeComponent, logout, checkIfSeeStatsListsIsDiplayed, clickOnStatsList } from "./utils";

describe("login-playersList-logout-flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.intercept(
      'GET',
      '/api/stats/rankings',
      {
        statusCode: 200,
        fixture: "rankings.json"
      }
    )
    cy.intercept(
      'GET',
      '/api/stats/strikers',
      {
        statusCode: 200,
        fixture: "strikers.json"
      }
    )
    cy.intercept(
      'GET',
      '/api/stats/defenders',
      {
        statusCode: 200,
        fixture: "defenders.json"
      }
    )
  });

  it("validate actions", () => {
    cy.viewport(1440, 900).wait(500);
    checkIfWeAreInLoginComponent()
    login()
    checkIfWeAreInHomeComponent()
    clickOnStatsList()
    checkIfSeeStatsListsIsDiplayed()
    logout()
    checkIfWeAreInLoginComponent()
  });
});


