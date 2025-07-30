# 🧪 Automation Exercise – Cypress Tests

A set of end-to-end automated tests for [automationexercise.com](https://automationexercise.com), built using Cypress and TypeScript.

## 📁 Project Structure

```
cypress/
├── api-calls/           # Helper functions for user registration and login via API
├── e2e/
│   ├── ui/              # UI tests using classic it() blocks
│   │   ├── login.cy.ts
│   │   ├── purchase.cy.ts
│   │   ├── productSearch.cy.ts
│   ├── purchasePOM.cy.ts # Purchase test using Page Object Model
├── support/
│   ├── pages/           # Page Objects (CartPage, LoginPage, etc.)
│   ├── utils.ts         # Shared utilities (e.g., generateTestCredentials)
```

## 🧰 Technologies

- [Cypress](https://www.cypress.io/)
- TypeScript
- Page Object Model (partially)

## 🚀 Running Tests

### 1. Install dependencies

```bash
npm install
```

### 2. Run tests with Cypress UI

```bash
npx cypress open
```

### 3. Run tests in headless mode

```bash
npx cypress run
```

## 🧪 Test Coverage

### ✅ UI Tests (Classic)

- `login.cy.ts` – user login
- `purchase.cy.ts` – full purchase flow
- `productSearch.cy.ts` – product search

### ✅ UI Tests (POM)

- `purchasePOM.cy.ts` – purchase flow using Page Objects

### ✅ API Helpers

- `registerUserByApi()` – register user via API
- `loginUserByApi()` – fake login via API

## 🧠 Best Practices

- Dynamic test data (`utils.ts > generateTestCredentials`)
- Clear cookies before tests (`cy.clearCookies`)
- Shows both classic and POM styles
- Clean separation: UI / API / Utils

## ✍️ Author

Test project created by Remigiusz Wróblewski for learning and recruitment purposes.

## 📄 License

MIT – feel free to use, learn from, and improve this project.
