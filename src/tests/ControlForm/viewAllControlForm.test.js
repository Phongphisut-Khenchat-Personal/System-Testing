import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login.js'; 
import { viewAllControlForm } from '../../helpers/ControlForm/viewAllControlForm.js';

// Admin login credentials
const AdminEmail = 'admin';
const AdminPassword = 'Adm!n123';

// Test case for filtering Control Forms with status "ทั้งหมด"
test('TC001: filtering Control Forms with status "ทั้งหมด"', async ({ page }) => {
    // Perform login with admin credentials
    await login(page, AdminEmail, AdminPassword);
    
    // View all Control Forms with status "ทั้งหมด"
    await viewAllControlForm(page, "ทั้งหมด");
});

// Test case for filtering Control Forms with status "พร้อมใช้งาน"
test('TC002: filtering Control Forms with status "พร้อมใช้งาน"', async ({ page }) => {
    // Perform login with admin credentials
    await login(page, AdminEmail, AdminPassword);
    
    // View Control Forms with status "พร้อมใช้งาน"
    await viewAllControlForm(page, "พร้อมใช้งาน");
});

// Test case for filtering Control Forms with status "แบบร่าง"
test('TC003: filtering Control Forms with status "แบบร่าง"', async ({ page }) => {
    // Perform login with admin credentials
    await login(page, AdminEmail, AdminPassword);
    
    // View Control Forms with status "แบบร่าง"
    await viewAllControlForm(page, "แบบร่าง");
});

// Test case for filtering Control Forms with status "รอการตรวจสอบ"
test('TC004: filtering Control Forms with status "รอการตรวจสอบ"', async ({ page }) => {
    // Perform login with admin credentials
    await login(page, AdminEmail, AdminPassword);
    
    // View Control Forms with status "รอการตรวจสอบ"
    await viewAllControlForm(page, "รอการตรวจสอบ");
});

// Test case for filtering Control Forms with status "ถูกใช้งาน"
test('TC005: filtering Control Forms with status "ถูกใช้งาน"', async ({ page }) => {
    // Perform login with admin credentials
    await login(page, AdminEmail, AdminPassword);
    
    // View Control Forms with status "ถูกใช้งาน"
    await viewAllControlForm(page, "ถูกใช้งาน");
});

// Test case for filtering Control Forms with status "รอแก้ไข"
test('TC006: filtering Control Forms with status "รอแก้ไข"', async ({ page }) => {
    // Perform login with admin credentials
    await login(page, AdminEmail, AdminPassword);
    
    // View Control Forms with status "รอแก้ไข"
    await viewAllControlForm(page, "รอแก้ไข");
});