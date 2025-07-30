export const registerUserByApi = (
  name: string,
  email: string,
  password: string
) => {
  return cy.request({
    method: "POST",
    url: "https://automationexercise.com/api/createAccount",
    form: true,
    body: {
      name,
      email,
      password,
      title: "Mr",
      birth_date: "10",
      birth_month: "June",
      birth_year: "1990",
      firstname: "John",
      lastname: "Doe",
      company: "Test Corp",
      address1: "Test Street 1",
      address2: "Suite 202",
      country: "Canada",
      state: "Ontario",
      city: "Toronto",
      zipcode: "12345",
      mobile_number: "123456789",
    },
    failOnStatusCode: false,
  });
};

export const loginUserByApi = (email: string, password: string) => {
  cy.visit("https://automationexercise.com/login");

  cy.get('input[data-qa="login-email"]').type(email);
  cy.get('input[data-qa="login-password"]').type(password);
  cy.get('button[data-qa="login-button"]').click();

  cy.contains("Logged in as").should("exist");
};
