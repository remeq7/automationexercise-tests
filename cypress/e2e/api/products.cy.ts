describe("API Test - Get All Products", () => {
  //API 1: Get All Products List
  it("should return a list of all products", () => {
    cy.request({
      method: "GET",
      url: "https://automationexercise.com/api/productsList",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.not.be.null;

      const products = JSON.parse(response.body);

      expect(products).to.have.property("products");
      expect(products.products).to.be.an("array");
      expect(products.products.length).to.be.greaterThan(0);

      cy.log(`Znaleziono ${products.products.length} produktów`);
    });
  });

  //API 2: POST To All Products List
  it("should return 405 Method Not Allowed", () => {
    cy.request({
      method: "POST",
      url: "https://automationexercise.com/api/productsList",
      failOnStatusCode: false,
    }).then((res) => {
      const body =
        typeof res.body === "string" ? JSON.parse(res.body) : res.body;

      expect(res.status).to.eq(200);
      expect(body).to.have.property("responseCode", 405);
      expect(body).to.include({
        message: "This request method is not supported.",
      });
    });
  });
});
