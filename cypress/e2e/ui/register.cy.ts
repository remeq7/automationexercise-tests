import { validUser, accountDetails } from "../../support/Users";
import { generateTestCredentials } from "../../support/utils";

const { email, password, name } = generateTestCredentials();
describe("User Registration", () => {
  before(() => {
    cy.clearCookies();
    cy.visit("/");
    cy.contains("Signup / Login").click();
  });

  it("should fill signup form and proceed to account details", () => {
    cy.get('input[data-qa="signup-name"]').type(name);
    cy.get('input[data-qa="signup-email"]').type(email);
    cy.get('button[data-qa="signup-button"]').click();
  });

  it("should complete account creation", () => {
    // Fill account details
    cy.get("#id_gender1").check(); // Mr
    cy.get("#password").type(password);
    cy.get("#days").select("10");
    cy.get("#months").select("June");
    cy.get("#years").select("1990");

    cy.get("#first_name").type(accountDetails.firstName);
    cy.get("#last_name").type(accountDetails.lastName);
    cy.get("#company").type(accountDetails.company);
    cy.get("#address1").type(accountDetails.address);
    cy.get("#state").type(accountDetails.state);
    cy.get("#city").type(accountDetails.city);
    cy.get("#zipcode").type(accountDetails.zipcode);
    cy.get("#mobile_number").type(accountDetails.mobileNumber);

    cy.get('button[data-qa="create-account"]').click();

    // Assert account creation
    cy.contains("Account Created!").should("be.visible");
  });

  it("should confirm login and delete account", () => {
    cy.get('a[data-qa="continue-button"]').click();
    cy.contains("Logged in as").should("be.visible");

    cy.log(`Registered user: ${email}`);

    // Clean up
    cy.contains("Delete Account").click();
    cy.contains("Account Deleted!").should("be.visible");
  });

  it("should show error when email already exists", () => {
    cy.visit("/login");
    cy.get('input[data-qa="signup-name"]').type("ExistingUser");
    cy.get('input[data-qa="signup-email"]').type(validUser.email);
    cy.get('button[data-qa="signup-button"]').click();
    cy.contains("Email Address already exist!").should("be.visible");
  });
});
