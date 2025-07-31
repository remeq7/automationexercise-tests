import { validUser, invalidUser } from "../../support/Users";

describe("Login - negative test", () => {
  before(() => {
    cy.clearCookies();
  });

  it("Should show error with invalid credentials", () => {
    cy.visit("/login");

    cy.get('input[data-qa="login-email"]').type(invalidUser.email);
    cy.get('input[data-qa="login-password"]').type(invalidUser.password);
    cy.get('button[data-qa="login-button"]').click();

    cy.contains("Your email or password is incorrect!").should("be.visible");
  });

  it("should successfully log in with valid credentials", () => {
    cy.visit("/");
    cy.contains("Signup / Login").click();

    cy.get('input[data-qa="login-email"]').type(validUser.email);
    cy.get('input[data-qa="login-password"]').type(validUser.password);
    cy.get('button[data-qa="login-button"]').click();

    // Sprawdzenie, że jesteśmy zalogowani
    cy.contains("Logged in as").should("be.visible");
  });

  it("Should log out", () => {
    // (Opcjonalnie) wylogowanie
    cy.contains("Logout").click();
    cy.contains("Signup / Login").should("be.visible");
  });
});
