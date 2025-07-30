/// <reference types="cypress" />

describe("API Test - Get All Products", () => {
  it("should return a list of all products", () => {
    cy.request({
      method: "GET",
      url: "https://automationexercise.com/api/productsList",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.not.be.null;

      // Jeśli response.body jest typu JSON, spróbuj sparsować:
      const products = JSON.parse(response.body);

      // Przykładowe asercje:
      expect(products).to.have.property("products");
      expect(products.products).to.be.an("array");
      expect(products.products.length).to.be.greaterThan(0);

      cy.log(`Znaleziono ${products.products.length} produktów`);
    });
  });
});
