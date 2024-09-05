import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';

test.describe('Form Validation Tests', () => {
    let registerPage: RegisterPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        await page.goto('http://localhost:8080/');
    });

    test('should show error messages for empty fields', async () => {
        await registerPage.submitForm();

        const errorMessages = await registerPage.getErrorMessages();
        expect(errorMessages).toContain('Pole Imię jest wymagane');
        expect(errorMessages).toContain('Pole Nazwisko jest wymagane');
        expect(errorMessages).toContain('Pole E-mail jest wymagane');
        expect(errorMessages).toContain('Pole password jest wymagane');
        expect(errorMessages).toContain('Pole Powtórz hasło jest wymagane');
        expect(errorMessages).toContain('Pole Data urodzenia jest wymagane');
        expect(errorMessages).toContain('To pole jest wymagane');
    });

    test('should show error message for mismatched and not meet the requirement passwords', async () => {
        await registerPage.fillForm('test@example.com', 'a', 'password124', 'John', 'Doe', '2000-01-01');
        await registerPage.submitForm();

        const errorMessages = await registerPage.getErrorMessages();
        expect(errorMessages).toContain('Hasła nie są jednakowe!');
        expect(errorMessages).toContain('Hasło musi zawierać: co najmniej 8 znaków, dużą literę, liczbę, znak specjalny!');
    });

    test('should not allow registration without accepting terms', async () => {
        await registerPage.fillForm('test@example.com', 'password123', 'password123', 'John', 'Doe', '2000-01-01');
        await registerPage.uncheckTermsAndConditions();
        await registerPage.submitForm();

        const errorMessages = await registerPage.getErrorMessages();
        expect(errorMessages).toContain('To pole jest wymagane');
    });
});