# Registration Page Automation with Playwright

## Overview

This project is an automated test suite for the registration page of a web application. It uses [Playwright](https://playwright.dev/) for end-to-end testing and follows the Page Object Model (POM) design pattern. The automation scripts cover various scenarios for user registration, including form validation, custom date picker handling, and successful registration.

This project is part of a recruitment task and demonstrates professional coding practices and adherence to industry standards in test automation.

## Table of Contents

1. [Project Setup](#project-setup)
2. [Running Tests](#running-tests)
3. [Test Scenarios](#test-scenarios)

## Project Setup

### Prerequisites

Ensure the following are installed:
- [Node.js](https://nodejs.org/en/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/twitkowski1308/Panowie_programisci.git

2. Navigate to the project directory:
    ```bash
   cd Panowie_programisci

3. Install all necessary dependencies:
    ```bash
   npm install

4. Install Playwright browsers:
    ```bash
   npx playwright install

## Running Tests

### Run All Tests

To run all tests, use:
```bash
npx playwright test
```
### Run a Specific Test
To execute a specific test file:
```bash
npx playwright tests/register.spec.ts
```
or
```bash
npx playwright tests/formValidation.spec.ts
```
### Headed mode
```bash
npx playwright test --headed
```
### View test report
```bash
npx playwright show-report
```

## Test Scenarios

The test suite includes the following scenarios:

- **Valid Registration**: Tests successful user registration with valid data.
- **Form Validation**: Ensures the form handles validation errors properly (e.g., empty fields, mismatched passwords).
- **Custom Date Picker**: Tests functionality of the custom date picker for selecting birth dates.
- **Language Selection**: Verifies that the language selection dropdown functions correctly.
- **Acceptance of Terms**: Verifies that the "Accept Terms and Conditions" checkbox must be checked for successful registration.
