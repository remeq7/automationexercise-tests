import { registerUserByApi, loginUserByApi } from "../../api-calls/auth";
import { generateTestCredentials } from "../../support/utils";

describe("Product search", () => {
  const { email, password } = generateTestCredentials();
  before(() => {
    cy.clearCookies();
    registerUserByApi("Test User", email, password); // helper
    loginUserByApi(email, password); //fejkowe logowanie przez API
  });

  it('should find products when searching for "dress"', () => {
    cy.visit("/products");
    cy.get("#search_product").type("Dress");
    cy.get("#submit_search").click();

    cy.get(".features_items .productinfo p").should("exist");
    cy.get(".features_items .productinfo p")
      .should("exist")
      .then(($items) => {
        let found = false;
        $items.each((_, el) => {
          const text = el.innerText.toLowerCase();
          cy.log("Found:", text);
          if (text.includes("dress")) {
            found = true;
          }
        });
        expect(found, "At least one result should include 'dress'").to.be.true;
      });
  });

  it("should show no results when searching for nonsense", () => {
    cy.visit("/products");
    cy.get("#search_product").type("xyz123456");
    cy.get("#submit_search").click();

    cy.get(".features_items .productinfo p").should("not.exist");
  });
});
