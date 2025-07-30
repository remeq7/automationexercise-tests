// === cypress/support/pages/ConfirmationPage.ts ===
export class ConfirmationPage {
  verifySuccess() {
    cy.contains("Congratulations! Your order has been confirmed!");
  }

  downloadInvoiceAndVerify() {
    cy.contains("Download Invoice").click();
    const filePath = "cypress/downloads/invoice.txt";
    cy.readFile(filePath, { timeout: 10000 }).should("exist");
    cy.readFile(filePath).then((text) => {
      expect(text).to.include(
        "Hi John Doe, Your total purchase amount is 500. Thank you"
      );
    });
  }
}
