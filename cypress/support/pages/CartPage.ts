// === cypress/support/pages/CartPage.ts ===
export class CartPage {
  proceedToCheckoutWithMessage(message: string) {
    cy.contains("Proceed To Checkout").click();
    cy.get('textarea[name="message"]').type(message);
    cy.contains("Place Order").click();
  }
}
