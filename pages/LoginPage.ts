import { Locator, Page } from "playwright";

export default class LoginPage {
    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailField = this.page.locator("#userEmail");
        this.passwordField = this.page.locator("#userPassword");
        this.submitButton = this.page.locator("#login");
    }

    async gotoLink() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async fillEmailAndPasswordAndSubmit(email: string, password: string) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.submitButton.click();
    }

    async fillEmail(email: string) {
        await this.emailField.fill(email)
    }

    async fillPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async clickSubmitButton() {
        await this.submitButton.click();
    }
}