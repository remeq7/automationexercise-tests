describe("Login API error handling", () => {
  it("should display error message when server returns 500 on login", () => {
    cy.intercept("POST", "/login", {
      statusCode: 500,
      body: { message: "Internal server error" },
    }).as("loginFail");

    cy.visit("/login");
    cy.get('input[data-qa="login-email"]').type("bad@example.com");
    cy.get('input[data-qa="login-password"]').type("wrongpass");
    cy.get('button[data-qa="login-button"]').click();

    cy.wait("@loginFail");
    cy.contains("Internal server error").should("be.visible");
  });
});
