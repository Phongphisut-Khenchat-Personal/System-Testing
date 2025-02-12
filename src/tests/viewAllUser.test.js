import { test, expect } from '@playwright/test';
import { login } from '../helpers/login.js'; 
import { viewAllUser } from '../helpers/viewAllUser.js';

// Admin login credentials
const AdminEmail = 'admin';
const AdminPassword = 'Adm!n123';

// User login credentials
const UserEmail = 'User';
const UserPassword = 'User';


test('TC001: gg', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);
    await viewAllUser(page);
});