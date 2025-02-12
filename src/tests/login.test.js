import { test, expect } from '@playwright/test';
import { login } from '../helpers/login.js'; // Import the login function from the login helper


// Admin login credentials
const AdminEmail = 'admin';
const AdminPassword = 'Adm!n123';

// User login credentials
const UserEmail = 'User';
const UserPassword = 'User';

// Test case for logging in with valid credentials
test('Login with valid credentials', async ({ page }) => {
    // Perform the login action with valid username and password
    await login(page, AdminEmail, AdminPassword);
    
    // Verify that the URL is correct after login
    await expect(page).toHaveURL('https://pramern.withyamroll.com/assignments');
});
