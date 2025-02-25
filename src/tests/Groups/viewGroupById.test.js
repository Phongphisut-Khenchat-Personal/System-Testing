import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login.js'; 
import { viewGroupById } from '../../helpers/Groups/viewGroupById.js'; // Update path as per the actual file

// Admin login credentials
const AdminEmail = 'admin';
const AdminPassword = 'Adm!n123';

test('TC007: view Group ById', async ({ page }) => {
    // Perform login with admin credentials
    await login(page, AdminEmail, AdminPassword);

    // Call the function to verify all users' names from the table, including across all pages
    await viewGroupById(page);
});