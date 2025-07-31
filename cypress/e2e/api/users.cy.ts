import { generateTestCredentials } from "../../support/utils";

describe("User Account API - CRUD operations", () => {
  const { email } = generateTestCredentials();
  //API 11: POST To Create/Register User Account
  it("should create a user successfully", () => {
    cy.request({
      method: "POST",
      url: "https://automationexercise.com/api/createAccount",
      form: true,
      body: {
        name: "Api Test",
        email: email,
        password: "Test1234!",
        title: "Mr",
        birth_date: "10",
        birth_month: "June",
        birth_year: "1990",
        firstname: "John",
        lastname: "Doe",
        company: "Automation Inc.",
        address1: "Test Street 1",
        address2: "Suite 42",
        country: "Canada",
        state: "Ontario",
        city: "Toronto",
        zipcode: "A1B2C3",
        mobile_number: "123456789",
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.contain("User created");
    });
  });
  //API 13: PUT METHOD To Update User Account
  it("should update a user successfully", function () {
    cy.request({
      method: "PUT",
      url: "https://automationexercise.com/api/updateAccount",
      form: true,
      body: {
        name: "Updated Name",
        email: email,
        password: "Test1234!",
        title: "Mr",
        birth_date: "11",
        birth_month: "July",
        birth_year: "1991",
        firstname: "Johnny",
        lastname: "Updated",
        company: "New Company Inc.",
        address1: "New Street 42",
        address2: "Unit 88",
        country: "United States",
        state: "NY",
        city: "New York",
        zipcode: "10001",
        mobile_number: "9876543210",
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.contain("User updated!");
    });
  });
  //API 14: GET user account detail by email
  it("should get user details successfully", function () {
    cy.request({
      method: "GET",
      url: `https://automationexercise.com/api/getUserDetailByEmail?email=${email}`,
    }).then((res) => {
      expect(res.status).to.eq(200);

      const body =
        typeof res.body === "string" ? JSON.parse(res.body) : res.body;

      expect(body).to.have.property("responseCode", 200);
      expect(body).to.have.property("user");
      expect(body.user).to.have.property("email", email);
    });
  });
  //API 12: DELETE METHOD To Delete User Account
  it("should delete a user successfully", () => {
    cy.request({
      method: "DELETE",
      url: "https://automationexercise.com/api/deleteAccount",
      form: true,
      body: {
        email: email,
        password: "Test1234!",
      },
      failOnStatusCode: false,
    }).then((delRes) => {
      expect(delRes.status).to.eq(200);
      expect(delRes.body).to.contain("Account deleted");
    });
  });
});
