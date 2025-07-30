describe("Login - negative test", () => {
  it("Should show error with invalid credentials", () => {
    cy.visit("https://automationexercise.com/login");

    cy.get('input[data-qa="login-email"]').type("invalid@email.com");
    cy.get('input[data-qa="login-password"]').type("wrongpassword");
    cy.get('button[data-qa="login-button"]').click();

    cy.contains("Your email or password is incorrect!").should("be.visible");
  });

  it("should successfully log in with valid credentials", () => {
    cy.visit("https://automationexercise.com");
    cy.contains("Signup / Login").click();

    // Wstaw tutaj poprawne dane z rejestracji
    const email = "uwb04509@toaik.com";
    const password = "Newpassword123!";

    cy.get('input[data-qa="login-email"]').type(email);
    cy.get('input[data-qa="login-password"]').type(password);
    cy.get('button[data-qa="login-button"]').click();

    // Sprawdzenie, że jesteśmy zalogowani
    cy.contains("Logged in as").should("be.visible");

    // (Opcjonalnie) wylogowanie
    cy.contains("Logout").click();
    cy.contains("Signup / Login").should("be.visible");
  });
});
