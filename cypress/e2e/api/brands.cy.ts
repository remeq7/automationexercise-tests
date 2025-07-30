describe("API 3 - Get All Brands List", () => {
  it("should get all brands list successfully", () => {
    cy.request({
      method: "GET",
      url: "https://automationexercise.com/api/brandsList",
    }).then((res) => {
      expect(res.status).to.eq(200); // sprawdzenie statusu

      const body =
        typeof res.body === "string" ? JSON.parse(res.body) : res.body;

      expect(body).to.have.property("brands");
      expect(body.brands).to.be.an("array");
      expect(body.brands.length).to.be.greaterThan(0); // lista nie jest pusta

      // sprawdzenie, czy każdy brand ma nazwę
      body.brands.forEach((brand: string) => {
        expect(brand).to.have.property("brand");
      });
    });
  });

  //do lookniecia jeszcze
  it("should respond with 405 Method Not Allowed", () => {
    cy.request({
      method: "PUT",
      url: "https://automationexercise.com/api/brandsList",
      failOnStatusCode: false, // ważne, bo domyślnie Cypress failuje przy 4xx/5xx
    }).then((res) => {
      expect(res.status).to.eq(200); // sprawdzamy kod odpowiedzi
      expect(res.body).to.include("This request method is not supported.");
    });
  });
});
