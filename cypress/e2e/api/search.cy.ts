describe("Search Product API - valid and missing parameter cases", () => {
  //API 5: POST To Search Product
  it("should return a list of searched products", () => {
    cy.request({
      method: "POST",
      url: "https://automationexercise.com/api/searchProduct",
      form: true,
      body: {
        search_product: "top",
      },
    }).then((res) => {
      expect(res.status).to.eq(200); // sprawdzenie statusu

      const body =
        typeof res.body === "string" ? JSON.parse(res.body) : res.body;
      expect(body).to.have.property("responseCode", 200);

      expect(body).to.have.property("products");
      expect(body.products).to.be.an("array");
      expect(body.products.length).to.be.greaterThan(0); // upewnij się, że coś zwrócono

      // dodatkowo sprawdź, czy każdy produkt ma nazwę
      body.products.forEach((product: any) => {
        expect(product).to.have.property("name");
      });
    });
  });
  //API 6: POST To Search Product without search_product parameter
  it("should return 400 when search_product parameter is missing", () => {
    cy.request({
      method: "POST",
      url: "https://automationexercise.com/api/searchProduct",
      form: true,
      failOnStatusCode: false, // pozwala przetestować błędne odpowiedzi
      body: {},
    }).then((res) => {
      expect(res.status).to.eq(200); // sprawdzenie statusu błędu

      const body =
        typeof res.body === "string" ? JSON.parse(res.body) : res.body;
      expect(body).to.have.property("responseCode", 400);
      expect(body).to.have.property(
        "message",
        "Bad request, search_product parameter is missing in POST request."
      );
    });
  });
});
