describe("API 7 - Verify Login with valid details", () => {
  it("should verify user login successfully", () => {
    const email = "uwb04509@toaik.com"; // <-- zamień na poprawny email
    const password = "Newpassword123!"; // <-- zamień na poprawne hasło

    cy.request({
      method: "POST",
      url: "https://automationexercise.com/api/verifyLogin",
      form: true,
      body: {
        email,
        password,
      },
    }).then((res) => {
      expect(res.status).to.eq(200); // sprawdzamy status HTTP
      expect(res.body).to.include("User exists!"); // sprawdzamy treść odpowiedzi
    });
  });

  it("should return 400 when email is missing", () => {
    const password = "123456"; // przykładowe hasło

    cy.request({
      method: "POST",
      url: "https://automationexercise.com/api/verifyLogin",
      form: true,
      failOnStatusCode: false, // ważne! bo oczekujemy błędu 400
      body: {
        password,
        // brak pola "email"
      },
    }).then((res) => {
      expect(res.status).to.eq(200); // te kody do poprawy bo przychodza w body
      const body =
        typeof res.body === "string" ? JSON.parse(res.body) : res.body;
      expect(body).to.have.property("responseCode", 400);
      expect(res.body).to.include(
        "Bad request, email or password parameter is missing in POST request"
      );
    });
  });

  it("should return 405 for unsupported DELETE method", () => {
    cy.request({
      method: "DELETE",
      url: "https://automationexercise.com/api/verifyLogin",
      failOnStatusCode: false, // bo 405 to nie 2xx
    }).then((res) => {
      expect(res.status).to.eq(200);
      const body =
        typeof res.body === "string" ? JSON.parse(res.body) : res.body;
      expect(body).to.have.property("responseCode", 405);
      expect(body).to.have.property(
        "message",
        "This request method is not supported."
      );
    });
  });

  it("should return 404 for invalid login credentials", () => {
    cy.request({
      method: "POST",
      url: "https://automationexercise.com/api/verifyLogin",
      failOnStatusCode: false, // bo spodziewamy się błędu
      form: true,
      body: {
        email: "nonexistentuser@example.com",
        password: "wrongpassword",
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      const body =
        typeof res.body === "string" ? JSON.parse(res.body) : res.body;
      expect(body).to.have.property("responseCode", 404);
      expect(body).to.have.property("message", "User not found!");
    });
  });
});
