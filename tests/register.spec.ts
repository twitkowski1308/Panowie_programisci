import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';

const registrationData = [
  {
    firstName: 'Anna',
    lastName: 'Nowak',
    email: 'anna.nowak@example.com',
    password: 'StrongPassword123!',
    confirmPassword: 'StrongPassword123!',
    birthDate: '1985-07-15',
    language: 'polski',
    phoneNumber: '987654321',
    acceptTerms: true,
    acceptMarketing: true
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'Password@123',
    confirmPassword: 'Password@123',
    birthDate: '1990-03-22',
    language: 'afar',
    phoneNumber: '123456789',
    acceptTerms: true,
    acceptMarketing: false
  },
  {
    firstName: 'Maria',
    lastName: 'Kowalska',
    email: 'maria.kowalska@example.com',
    password: 'Maria!Pass2022',
    confirmPassword: 'Maria!Pass2022',
    birthDate: '2000-01-01',
    language: 'esperanto',
    phoneNumber: '789123456',
    acceptTerms: true,
    acceptMarketing: true
  }
];

test.describe.parallel('Registration Page Tests', () => {

  for (const data of registrationData) {
    test(`should register a new user with email: ${data.email}`, async ({ page }) => {
      const registerPage = new RegisterPage(page);

      // Navigate to the registration page
      await page.goto('http://localhost:8080');

      // Fill the registration form
      await registerPage.fillRegistrationForm({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        birthDate: data.birthDate,
        customDate: true, // Assuming custom date picker for this test
        language: data.language,
        phoneNumber: data.phoneNumber,
        acceptTerms: data.acceptTerms,
        acceptMarketing: data.acceptMarketing
      });

    // Assertion: Verify if the registration was successful
    await expect(page).toHaveURL('http://localhost:8080');
    const successMessageLocator = page.locator(`//h1`);
    const successParagraphLocator = page.locator(`//h1/..//p`);
    const successEmail = page.locator(`//h1/..//p/span`)
    await expect(successMessageLocator).toBeVisible();
    await expect(successParagraphLocator).toBeVisible();
    await expect(successEmail).toBeVisible();

    // Assertion: Verify if the registration was successful by checking the message
    await expect(successMessageLocator).toContainText(', dziękujemy za');
    await expect(successMessageLocator).toContainText('rejestrację!');
    await expect(successParagraphLocator).toContainText('Na');
    await expect(successParagraphLocator).toContainText('Twój adres email');
    await expect(successEmail).toContainText(data.email);
  });
}
});