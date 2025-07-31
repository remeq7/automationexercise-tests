import { cardDetails } from "../../support/Users";

export class PaymentPage {
  fillCardDetailsAndConfirm(name: string) {
    cy.get('input[name="name_on_card"]').type(cardDetails.nameOnCard);
    cy.get('input[name="card_number"]').type(cardDetails.cardNumber);
    cy.get('input[name="cvc"]').type(cardDetails.CVC);
    cy.get('input[name="expiry_month"]').type(cardDetails.expirationMonth);
    cy.get('input[name="expiry_year"]').type(cardDetails.expirationYear);
    cy.contains("Pay and Confirm Order").click();
  }
}
