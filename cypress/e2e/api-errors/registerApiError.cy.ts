describe("Register API error handling", () => {
  it("should display error message when server returns 500 on registration", () => {
    cy.intercept("POST", "/signup", {
      statusCode: 500,
      body: { message: "Internal server error" },
    }).as("registerFail");

    cy.visit("/login"); // rejestracja jest na tej samej stronie
    cy.get('input[data-qa="signup-name"]').type("ErrorUser");
    cy.get('input[data-qa="signup-email"]').type("error@example.com");
    cy.get('button[data-qa="signup-button"]').click();

    cy.wait("@registerFail");
    cy.contains("Internal server error").should("be.visible");
  });
});
