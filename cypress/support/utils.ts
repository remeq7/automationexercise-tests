export function generateTestCredentials() {
  const email = `test${Date.now()}@mail.com`;
  const password = "Test1234";
  return { email, password };
}
