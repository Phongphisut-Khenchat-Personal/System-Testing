import { test, expect } from '@playwright/test';
import { login } from '../helpers/login.js'; 
import { viewAllUser } from '../helpers/viewAllUser.js';

// Admin login credentials
const AdminEmail = 'admin';
const AdminPassword = 'Adm!n123';

// Test case for filtering users with status "ทั้งหมด"
test('TC001: filtering users with status "ทั้งหมด"', async ({ page }) => {
    // Perform login with admin credentials
    await login(page, AdminEmail, AdminPassword);
    
    // View all users with status "ทั้งหมด"
    await viewAllUser(page, "ทั้งหมด");
});

// Test case for filtering users with status "เปิดการใช้งาน"
test('TC002: filtering users with status "เปิดการใช้งาน"', async ({ page }) => {
    // Perform login with admin credentials
    await login(page, AdminEmail, AdminPassword);
    
    // View users with status "เปิดการใช้งาน"
    await viewAllUser(page, "เปิดการใช้งาน");
});

// Test case for filtering users with status "ระงับ"
test('TC003: filtering users with status "ระงับ"', async ({ page }) => {
    // Perform login with admin credentials
    await login(page, AdminEmail, AdminPassword);
    
    // View users with status "ระงับ"
    await viewAllUser(page, "ระงับ");
});