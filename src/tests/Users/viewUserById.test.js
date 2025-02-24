import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login.js'; 
import { verifyAllUsersNamesFromTable } from '../../helpers/Users/viewUserById.js'; // Update path as per the actual file

// Admin login credentials
const AdminEmail = 'admin';
const AdminPassword = 'Adm!n123';

test('TC007: Verify All Users Names Match Between Table and Details Across Pages', async ({ page }) => {
    // Perform login with admin credentials
    await login(page, AdminEmail, AdminPassword);

    // Call the function to verify all users' names from the table, including across all pages
    await verifyAllUsersNamesFromTable(page);
});