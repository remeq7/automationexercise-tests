import { validUser } from "../../support/Users";
import { registerUserByApi } from "../../api-calls/auth";
/// <reference types="cypress" />

describe("User Registration", () => {
  beforeEach(() => {
    cy.visit("https://automationexercise.com");
    cy.contains("Signup / Login").click();
  });

  it("should successfully register a new user", () => {
    // Fill signup form
    const timestamp = Date.now();
    const name = "TestUser";
    const email = `testuser${timestamp}@mail.com`;

    cy.get('input[data-qa="signup-name"]').type(name);
    cy.get('input[data-qa="signup-email"]').type(email);
    cy.get('button[data-qa="signup-button"]').click();

    // Fill account details
    cy.get("#id_gender1").check(); // Mr
    cy.get("#password").type("Test1234!");
    cy.get("#days").select("10");
    cy.get("#months").select("June");
    cy.get("#years").select("1990");

    cy.get("#first_name").type("John");
    cy.get("#last_name").type("Doe");
    cy.get("#company").type("Test Company");
    cy.get("#address1").type("Test Street 1");
    cy.get("#state").type("Test State");
    cy.get("#city").type("Test City");
    cy.get("#zipcode").type("12345");
    cy.get("#mobile_number").type("123456789");

    cy.get('button[data-qa="create-account"]').click();

    // Assert account creation
    cy.contains("Account Created!").should("be.visible");

    // Continue
    cy.get('a[data-qa="continue-button"]').click();

    // Logged in?
    cy.contains("Logged in as").should("be.visible");

    cy.log(`Registered user: ${email}`);

    // Clean up – delete account
    cy.contains("Delete Account").click();
    cy.contains("Account Deleted!").should("be.visible");
  });

  it("should show error when email already exists", () => {
    cy.get('input[data-qa="signup-name"]').type("ExistingUser");
    cy.get('input[data-qa="signup-email"]').type(validUser.email);
    cy.get('button[data-qa="signup-button"]').click();

    cy.contains("Email Address already exist!").should("be.visible");
  });

  it.skip("register by api", () => {
    registerUserByApi("name", "emaila@gmail.com", "password").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.contain("User created!");
    });
  });
});
