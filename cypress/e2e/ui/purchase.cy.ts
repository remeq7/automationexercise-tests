import { registerUserByApi, loginUserByApi } from "../../api-calls/auth";
import { generateTestCredentials } from "../../support/utils";
import { cardDetails } from "../../support/Users";

describe("E2E Purchase Flow", () => {
  before(() => {
    // Rejestracja użytkownika przez API
    const { email, password } = generateTestCredentials();
    cy.clearCookies();
    registerUserByApi("Test User", email, password); // helper
    loginUserByApi(email, password); //fejkowe logowanie przez API
  });

  it("should add product to cart", () => {
    cy.contains("View Product").first().click();
    cy.get('input[name="quantity"]').clear().type("1");
    cy.get("button.cart").click();
    cy.contains("View Cart").click();
  });

  it("should proceed to checkout and place order", () => {
    cy.contains("Proceed To Checkout").click();

    cy.get('textarea[name="message"]').type("Please deliver ASAP.");
    cy.contains("Place Order").click();

    cy.get('input[name="name_on_card"]').type(cardDetails.nameOnCard);
    cy.get('input[name="card_number"]').type(cardDetails.cardNumber);
    cy.get('input[name="cvc"]').type(cardDetails.CVC);
    cy.get('input[name="expiry_month"]').type(cardDetails.expirationMonth);
    cy.get('input[name="expiry_year"]').type(cardDetails.expirationYear);
    cy.contains("Pay and Confirm Order").click();

    cy.contains("Congratulations! Your order has been confirmed!");
  });

  it("should download invoice and verify content", () => {
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
