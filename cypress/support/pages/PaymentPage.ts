// === cypress/support/pages/PaymentPage.ts ===
export class PaymentPage {
  fillCardDetailsAndConfirm(name: string) {
    cy.get('input[name="name_on_card"]').type(name);
    cy.get('input[name="card_number"]').type("1234123412341234");
    cy.get('input[name="cvc"]').type("123");
    cy.get('input[name="expiry_month"]').type("12");
    cy.get('input[name="expiry_year"]').type("2030");
    cy.contains("Pay and Confirm Order").click();
  }
}
