/// <reference types="cypress" />
import { checkIfWeAreInLoginComponent, login, checkIfWeAreInHomeComponent, logout, checkIfSeePlayersListIsDiplayed, clickOnPlayersList } from "./utils";

describe("login-playersList-logout-flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.intercept(
      'GET',
      '/api/player',
      {
        statusCode: 200,
        fixture: "players.json"
      }
    )
  });

  it("validate actions", () => {
    cy.viewport(1440, 900).wait(500);
    checkIfWeAreInLoginComponent()
    login()
    checkIfWeAreInHomeComponent()
    clickOnPlayersList()
    checkIfSeePlayersListIsDiplayed()
    logout()
    checkIfWeAreInLoginComponent()
  });
});


