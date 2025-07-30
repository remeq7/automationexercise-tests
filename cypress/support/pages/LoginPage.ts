export class LoginPage {
  visit() {
    cy.visit("https://automationexercise.com/login");
  }

  login(email: string, password: string) {
    cy.get('input[data-qa="login-email"]').type(email);
    cy.get('input[data-qa="login-password"]').type(password);
    cy.get('button[data-qa="login-button"]').click();
  }
}
