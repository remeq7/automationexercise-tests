describe("Login - negative test", () => {
  it("Should show error with invalid credentials", () => {
    cy.visit("https://automationexercise.com/login");

    cy.get('input[data-qa="login-email"]').type("invalid@email.com");
    cy.get('input[data-qa="login-password"]').type("wrongpassword");
    cy.get('button[data-qa="login-button"]').click();

    cy.contains("Your email or password is incorrect!").should("be.visible");
  });
});
