import { validUser, invalidUser } from "../../support/Users";

describe("API - Verify Login endpoint tests", () => {
  // API 7: valid details
  it("should verify user login successfully", () => {
    cy.request({
      method: "POST",
      url: "https://automationexercise.com/api/verifyLogin",
      form: true,
      body: {
        email: validUser.email,
        password: validUser.password,
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.include("User exists!");
    });
  });

  // API 8: missing email
  it("should return 400 when email is missing", () => {
    cy.request({
      method: "POST",
      url: "https://automationexercise.com/api/verifyLogin",
      form: true,
      failOnStatusCode: false,
      body: {
        password: invalidUser.password,
        // no "email" field
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

  // API 9: wrong method (DELETE)
  it("should return 405 for unsupported DELETE method", () => {
    cy.request({
      method: "DELETE",
      url: "https://automationexercise.com/api/verifyLogin",
      failOnStatusCode: false,
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

  // API 10: invalid details
  it("should return 404 for invalid login credentials", () => {
    cy.request({
      method: "POST",
      url: "https://automationexercise.com/api/verifyLogin",
      failOnStatusCode: false, // bo spodziewamy się błędu
      form: true,
      body: {
        email: invalidUser.email,
        password: invalidUser.password,
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
