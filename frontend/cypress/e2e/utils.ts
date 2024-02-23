/// <reference types="cypress" />
export const logout = () => {
  cy.get('[data-testid="logout-button"]').click().wait(200);
};

export const checkIfWeAreInHomeComponent = () => {
  cy.get('[data-testid="login-button"]').should("not.exist", { timeout: 0 });
  cy.get('[data-testid="home-component"]').should("exist").and("be.visible");
  cy.get('[data-testid="logout-button"]').should("exist").and("be.visible");
};

export const login = () => {
  cy.get('[data-testid="email-text"]').type('test@email.it').wait(100);
  cy.get('[data-testid="password-text"]').type('Password123!').wait(100);
  cy.get('button[type="submit"]').click().wait(200);
};

export const checkIfWeAreInLoginComponent = () => {
  cy.get('[data-testid="login-button"]').should("exist").and("be.visible");
  cy.get('[data-testid="home-component"]').should("not.exist", { timeout: 0 });
};

export const clickOnPlayersList = () => {
  cy.get('[data-testid="left-menu"]').should("exist").and("be.visible");
  cy.get('[data-testid="players-list-button"]').should("exist").and("be.visible").click().wait(200);
};

export const checkIfSeePlayersListIsDiplayed = () => {
  cy.get('[data-testid="players-list"]').should("exist").and("be.visible");
  cy.get('[data-testid="table-container"]').should("exist").and("be.visible");
};

export const clickOnTeamsList = () => {
  cy.get('[data-testid="left-menu"]').should("exist").and("be.visible");
  cy.get('[data-testid="teams-list-button"]').should("exist").and("be.visible").click().wait(200);
};

export const checkIfSeeTeamsListIsDiplayed = () => {
  cy.get('[data-testid="teams-list"]').should("exist").and("be.visible");
  cy.get('[data-testid="table-container"]').should("exist").and("be.visible");
};
