import { registerUserByApi } from "../../api-calls/auth";

describe("E2E Purchase Flow", () => {
  const email = `test${Date.now()}@mail.com`;
  const password = "Test1234";

  before(() => {
    // Rejestracja użytkownika przez API (jeśli masz gotowe API helpery)
    registerUserByApi("Test User", email, password); // Twój helper
  });

  it("should complete a purchase and download invoice", () => {
    // 🔐 Login
    cy.visit("https://automationexercise.com/login");
    cy.get('input[data-qa="login-email"]').type(email);
    cy.get('input[data-qa="login-password"]').type(password);
    cy.get('button[data-qa="login-button"]').click();
    cy.contains("Logged in as").should("exist");

    // 🛒 Dodanie produktu do koszyka
    //cy.visit("/products");
    cy.contains("View Product").first().click();
    cy.get('input[name="quantity"]').clear().type("1");
    cy.get("button.cart").click();
    cy.contains("View Cart").click();

    // 🧾 Checkout
    cy.contains("Proceed To Checkout").click();

    // Jeśli jest potrzeba dodania komentarza
    cy.get('textarea[name="message"]').type("Please deliver ASAP.");
    cy.contains("Place Order").click();

    // 💳 Dane karty
    cy.get('input[name="name_on_card"]').type("Test User");
    cy.get('input[name="card_number"]').type("1234123412341234");
    cy.get('input[name="cvc"]').type("123");
    cy.get('input[name="expiry_month"]').type("12");
    cy.get('input[name="expiry_year"]').type("2030");
    cy.contains("Pay and Confirm Order").click();

    // ✅ Potwierdzenie
    cy.contains("Congratulations! Your order has been confirmed!");

    // // 📥 Pobranie faktury
    cy.contains("Download Invoice").click();

    const filePath = "cypress/downloads/invoice.txt";
    cy.readFile(filePath, { timeout: 10000 }).should("exist");
    cy.readFile(filePath).then((text) => {
      expect(text).to.include(
        "Hi John Doe, Your total purchase amount is 500. Thank you"
      );
    });
  });
});
