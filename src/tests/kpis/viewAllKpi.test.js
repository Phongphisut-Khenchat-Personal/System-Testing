import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login.js'; 
import { viewAllKpi } from '../../helpers/kpis/viewAllKpi.js';

// Admin login credentials
const AdminEmail = 'admin';
const AdminPassword = 'Adm!n123';

// Test case for filtering KPIs with status "ทั้งหมด"
test('TC001: filtering KPIs with status "ทั้งหมด"', async ({ page }) => {
    // Perform login with admin credentials
    await login(page, AdminEmail, AdminPassword);
    
    // View all KPIs with status "ทั้งหมด"
    await viewAllKpi(page, "ทั้งหมด");
});

// Test case for filtering KPIs with status "ถูกใช้งาน"
test('TC002: filtering KPIs with status "ถูกใช้งาน"', async ({ page }) => {
    // Perform login with admin credentials
    await login(page, AdminEmail, AdminPassword);
    
    // View KPIs with status "ถูกใช้งาน"
    await viewAllKpi(page, "ถูกใช้งาน");
});

// Test case for filtering KPIs with status "พร้อมใช้งาน"
test('TC003: filtering KPIs with status "พร้อมใช้งาน"', async ({ page }) => {
    // Perform login with admin credentials
    await login(page, AdminEmail, AdminPassword);
    
    // View KPIs with status "พร้อมใช้งาน"
    await viewAllKpi(page, "พร้อมใช้งาน");
});

// Test case for filtering KPIs with status "แบบร่าง"
test('TC004: filtering KPIs with status "แบบร่าง"', async ({ page }) => {
    // Perform login with admin credentials
    await login(page, AdminEmail, AdminPassword);
    
    // View KPIs with status "แบบร่าง"
    await viewAllKpi(page, "แบบร่าง");
});