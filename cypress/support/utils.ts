import { faker } from "@faker-js/faker";

export function generateTestCredentials() {
  const email = `test${Date.now()}@mail.com`;
  const password = "Test1234";
  const name = faker.internet.userName();
  return { email, password, name };
}
