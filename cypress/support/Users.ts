import { faker } from "@faker-js/faker";

export const validUser = {
  email: "uwb04509@toaik.com",
  password: "Newpassword123!",
};

export const invalidUser = {
  email: "invalid@email.com",
  password: "wrongpassword",
};

export const accountDetails = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  company: faker.company.name(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  city: faker.address.city(),
  zipcode: faker.address.zipCode(),
  mobileNumber: faker.phone.number(),
};

export const cardDetails = {
  nameOnCard: faker.name.fullName(),
  cardNumber: faker.finance.creditCardNumber(),
  CVC: faker.finance.creditCardCVV(),
  expirationMonth: String(faker.date.future().getMonth() + 1).padStart(2, "0"),
  expirationYear: faker.date.future().getFullYear().toString(),
};
