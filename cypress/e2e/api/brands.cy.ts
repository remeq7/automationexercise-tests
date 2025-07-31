describe("Brands API - GET and PUT methods on /api/brandsList", () => {
  //API 3: Get All Brands List
  it("should get all brands list successfully", () => {
    cy.request({
      method: "GET",
      url: "https://automationexercise.com/api/brandsList",
    }).then((res) => {
      expect(res.status).to.eq(200);

      const body =
        typeof res.body === "string" ? JSON.parse(res.body) : res.body;

      expect(body).to.have.property("brands");
      expect(body.brands).to.be.an("array");
      expect(body.brands.length).to.be.greaterThan(0);

      body.brands.forEach((brand: string) => {
        expect(brand).to.have.property("brand");
      });
    });
  });

  //API 4: PUT To All Brands List
  it("should respond with 405 Method Not Allowed", () => {
    cy.request({
      method: "PUT",
      url: "https://automationexercise.com/api/brandsList",
      failOnStatusCode: false,
    }).then((res) => {
      const body =
        typeof res.body === "string" ? JSON.parse(res.body) : res.body;
      expect(res.status).to.eq(200);
      expect(body).to.have.property("responseCode", 405);
      expect(res.body).to.include("This request method is not supported.");
    });
  });
});
