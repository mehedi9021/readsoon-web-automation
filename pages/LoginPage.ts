import { BasePage } from "./BasePage";
import { ConfigReader } from "../utils/ConfigReader";

const baseUrl = ConfigReader.getProperty("BASE_URL");
const userEmail = ConfigReader.getProperty("USER_EMAIL");
const userPassword = ConfigReader.getProperty("USER_PASSWORD");

export class LoginPage extends BasePage {
  private emailInput = "#email";
  private passwordInput = "#password";
  private loginButton = "button[type='submit']";

  async navigateToPage() {
    await this.page.goto(baseUrl);
    return this;
  }

  async fillUserEmail() {
    await this.page.locator(this.emailInput).fill(userEmail);
    return this;
  }

  async fillUserPassword() {
    await this.page.locator(this.passwordInput).fill(userPassword);
    return this;
  }

  async clickLoginButton() {
    await this.page.locator(this.loginButton).click();
    return this;
  }

  async userLogin() {
    await this.navigateToPage();
    await this.fillUserEmail();
    await this.fillUserPassword();
    await this.clickLoginButton();
    await this.page.waitForTimeout(3000);
  }
}
