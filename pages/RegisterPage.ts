import { Page } from '@playwright/test';

export class RegisterPage {
    private page: Page;

    private firstNameField = '//input[@placeholder="Imię"]';
    private lastNameField = '//input[@placeholder="Nazwisko"]';
    private emailField = '//input[@type="email"]';
    private passwordField = '//input[@placeholder="Hasło"]';
    private confirmPasswordField = '//input[@placeholder="Powtórz hasło"]';
    private birthDateField = '//input[@name="date"]';
    private dateYearButton = '//button[@class="mx-btn mx-btn-text mx-btn-current-year"]';
    private yearButton = '//td[@data-year]/div';
    private previousDecadeButton = '//button[@class="mx-btn mx-btn-text mx-btn-icon-double-left"]';
    private nextDecadeButton = '//button[@class="mx-btn mx-btn-text mx-btn-icon-double-right"]';
    private languageDropdown = '//select[@class="input select"]';
    private phoneNumberField = '//input[@placeholder="Numer telefonu"]';
    private termsCheckbox = '//span[text()=" Akceptuję "]/../div[@class="fake-input"]';
    private marketingCheckbox = '//span[contains(text(),"Wyrażam zgodę na")]/../div[@class="fake-input"]';
    private submitButton = '//button[@type="submit"]';
    private errorMessages = () => this.page.locator('//span[@class="errors"]');
    private successMessage = () => this.page.locator('//h1[contains(text(),"dziękujemy") and contains(text(),"rejestrację!")]')

    constructor(page: Page) {
        this.page = page;
    }

    async fillForm(email: string, password: string, confirmPassword: string, firstName: string, lastName: string, birthDate: string) {
        await this.page.fill(this.emailField, email);
        await this.page.fill(this.passwordField, password);
        await this.page.fill(this.confirmPasswordField, confirmPassword);
        await this.page.fill(this.firstNameField, firstName);
        await this.page.fill(this.lastNameField, lastName);
        await this.page.fill(this.birthDateField, birthDate);
    }

    // Methods to interact with the form
    async enterFirstName(firstName: string) {
        await this.page.fill(this.firstNameField, firstName);
    }

    async enterLastName(lastName: string) {
        await this.page.fill(this.lastNameField, lastName);
    }

    async enterEmail(email: string) {
        await this.page.fill(this.emailField, email);
    }

    async enterPassword(password: string) {
        await this.page.fill(this.passwordField, password);
    }

    async confirmPassword(password: string) {
        await this.page.fill(this.confirmPasswordField, password);
    }

    // Scenario 1: HTML5 Date Input
    async enterBirthDate(birthDate: string) {
        // Assuming the format is YYYY-MM-DD (standard for HTML5 date inputs)
        await this.page.fill(this.birthDateField, birthDate);
    }

    // Scenario 2: Custom Date Picker
    async openDatePicker() {
        // Click on the date picker to open the calendar widget
        await this.page.click(this.birthDateField);
    }

    async getVisibleYearRange(): Promise<[string, string]> {
        const yearButtons = await this.page.$$(this.yearButton);
        const years = await Promise.all(yearButtons.map(async (el) => (await el.textContent()).trim()));
        return [years[0], years[years.length - 1]];  // Returns the first and last visible years
    }

    async selectYear(year: string) {
        let currentVisibleYearRange = await this.getVisibleYearRange();

        // Navigate through decades if the desired year is not within the current visible range
        while (year < currentVisibleYearRange[0]) {
            await this.page.click(this.previousDecadeButton);
            currentVisibleYearRange = await this.getVisibleYearRange();
        }
        while (year > currentVisibleYearRange[1]) {
            await this.page.click(this.nextDecadeButton);
            currentVisibleYearRange = await this.getVisibleYearRange();
        }

        // Click the year button matching the desired year
        await this.page.click(`td[data-year="${year}"]`);
    }

    async selectDateFromPicker(year: string, month: string, day: string) {
        // Handle the custom date picker. Adjust selectors as per the actual date picker structure.
        await this.page.click(this.dateYearButton);
        await this.selectYear(year);
        await this.page.click(`//td[number(@data-month)="${month}"]`); // Select month
        await this.page.click(`//td[@class='cell']/div[number(text())="${day}"]`); // Select day
    }

    async selectLanguage(language: string) {
        await this.page.selectOption(this.languageDropdown, { label: language });
    }

    async enterPhoneNumber(phoneNumber: string) {
        await this.page.fill(this.phoneNumberField, phoneNumber);
    }

    async acceptTermsAndConditions() {
        await this.page.check(this.termsCheckbox);
    }

    async uncheckTermsAndConditions() {
        await this.page.uncheck(this.termsCheckbox);
    }

    async acceptMarketingEmails() {
        await this.page.check(this.marketingCheckbox);
    }

    async getErrorMessages() {
        return this.errorMessages().allTextContents();
    }

    async submitForm() {
        await this.page.click(this.submitButton);
    }

    async getSuccessMessage(){
        return this.successMessage
    }



    // Method to fill the registration form
    async fillRegistrationForm(details: {
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        confirmPassword: string,
        birthDate: string,
        customDate: boolean, // To handle custom or HTML5 date picker
        language: string,
        phoneNumber: string,
        acceptTerms: boolean,
        acceptMarketing?: boolean
    }) {
        await this.enterFirstName(details.firstName);
        await this.enterLastName(details.lastName);
        await this.enterEmail(details.email);
        await this.enterPassword(details.password);
        await this.confirmPassword(details.confirmPassword);

        if (details.customDate) {
            // If custom date picker is used
            await this.openDatePicker();
            const [year, month, day] = details.birthDate.split('-');
            await this.selectDateFromPicker(year, month, day);
        } else {
            // If using HTML5 native date picker
            await this.enterBirthDate(details.birthDate);
        }

        await this.selectLanguage(details.language);
        await this.enterPhoneNumber(details.phoneNumber);

        if (details.acceptTerms) {
            await this.acceptTermsAndConditions();
        }
        if (details.acceptMarketing) {
            await this.acceptMarketingEmails();
        }
        await this.submitForm();
    }
}