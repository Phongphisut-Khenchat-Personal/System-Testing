import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login.js'; 
import { viewAllGroups } from '../../helpers/Groups/viewAllGroup.js';


// Admin login credentials
const AdminEmail = 'admin';
const AdminPassword = 'Adm!n123';

// Test case for viewing all groups
test('TC001: View all groups', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);
    await viewAllGroups(page);
});