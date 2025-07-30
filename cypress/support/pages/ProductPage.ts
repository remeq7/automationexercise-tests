// === cypress/support/pages/ProductPage.ts ===
export class ProductPage {
  addFirstProductToCart(quantity = "1") {
    cy.contains("View Product").first().click();
    cy.get('input[name="quantity"]').clear().type(quantity);
    cy.get("button.cart").click();
    cy.contains("View Cart").click();
  }
}
