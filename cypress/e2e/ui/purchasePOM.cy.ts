// === cypress/e2e/ui/purchase.cy.ts ===
import { LoginPage } from "../../support/pages/LoginPage";
import { ProductPage } from "../../support/pages/ProductPage";
import { CartPage } from "../../support/pages/CartPage";
import { PaymentPage } from "../../support/pages/PaymentPage";
import { ConfirmationPage } from "../../support/pages/ConfirmationPage";
import { registerUserByApi } from "../../api-calls/auth";

const loginPage = new LoginPage();
const productPage = new ProductPage();
const cartPage = new CartPage();
const paymentPage = new PaymentPage();
const confirmationPage = new ConfirmationPage();

describe("E2E Purchase Flow", () => {
  const email = `test${Date.now()}@mail.com`;
  const password = "Test1234";

  before(() => {
    registerUserByApi("Test User", email, password);
  });

  it("should complete a full purchase and verify invoice", () => {
    loginPage.visit();
    loginPage.login(email, password);

    productPage.addFirstProductToCart();
    cartPage.proceedToCheckoutWithMessage("Please deliver ASAP.");

    paymentPage.fillCardDetailsAndConfirm("Test User");
    confirmationPage.verifySuccess();
    confirmationPage.downloadInvoiceAndVerify();
  });
});
