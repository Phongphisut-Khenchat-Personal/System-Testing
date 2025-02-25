import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login.js';
import { createGroups } from '../../helpers/Groups/createGroup.js';

// Admin login credentials
const AdminEmail = 'admin';
const AdminPassword = 'Adm!n123';

// Expected success and error messages
const successMessage = 'สร้างกลุ่มสำเร็จ'; // Success message for group creation
const errorMessage = 'กรุณากรอกข้อมูลให้ครบถ้วน'; // Error message for incomplete information
const duplicateErrorMessage = 'ชื่อกลุ่มนี้ถูกใช้งานเเล้ว'; // Error message for duplicate group name
const SpecialCharactersErrorMessage = 'ชื่อกลุ่มต้องประกอบไปด้วยตัวอกษรภาษาไทย ภาษาอังกฤษ ตัวเลข เเละเครื่องหมาย-_เท่านั้น'; // Error message for invalid special characters

// Test Case 1: TC001 - Verify that the system can successfully create a group with a unique name
test('TC001: ตรวจสอบว่าระบบสามารถสร้างกลุ่มได้สำเร็จ', async ({ page }) => {
    // Log in with admin credentials
    await login(page, AdminEmail, AdminPassword);

    // Create a group with a unique name and no members
    await createGroups(page, 'ภาษาไทยหนรก', 'เป็นกลุ่มภาษาไทยหนรก', []);

    // Wait for the success message to appear and verify its visibility
    await page.locator(`text=${successMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${successMessage}`)).toBeVisible();
});

// Test Case 2: TC002 - Verify that the system can successfully create a group with one member
test('TC002: ตรวจสอบว่าระบบสามารถสร้างกลุ่มพร้อมสมาชิกได้สำเร็จ', async ({ page }) => {
    // Log in with admin credentials
    await login(page, AdminEmail, AdminPassword);

    // Create a group with one member
    await createGroups(page, 'คณิตศร์กกลลหห', 'เป็นกลุ่มศาตร์กกลลลบหห', ['พงศ์พิสุทธิ์ เคนชาติ']);

    // Wait for the success message to appear and verify its visibility
    await page.locator(`text=${successMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${successMessage}`)).toBeVisible();
});

// Test Case 3: TC003 - Verify that the system can successfully create a group with multiple members
test('TC003: ตรวจสอบว่าระบบสามารถสร้างกลุ่มพร้อมหลายสมาชิกได้สำเร็จ', async ({ page }) => {
    // Log in with admin credentials
    await login(page, AdminEmail, AdminPassword);

    // Create a group with multiple members
    await createGroups(page, 'ประวิติอมม', 'เป็นกลุ่มประวิมทป', ['พงศ์พิสุทธิ์ เคนชาติ', 'วณิชชา ยีขะเด']);

    // Wait for the success message to appear and verify its visibility
    await page.locator(`text=${successMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${successMessage}`)).toBeVisible();
});

// Test Case 4: TC004 - Verify that the system prevents creating a group with a duplicate group name
test('TC004: ตรวจสอบว่าระบบมีการป้องกันการสร้างชื่อกลุ่มซ้ำกัน', async ({ page }) => {
    // Log in with admin credentials
    await login(page, AdminEmail, AdminPassword);

    // Attempt to create a group with a name that already exists
    await createGroups(page, 'สุขศึกษาห', 'เป็นกลุ่มสุขศึกษาห', []);

    // Wait for the duplicate error message to appear and verify its visibility
    await page.locator(`text=${duplicateErrorMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${duplicateErrorMessage}`)).toBeVisible();
});

// Test Case 5: TC005 - Verify that the system prevents creating a group with incomplete information
test('TC005: ตรวจสอบว่าระบบมีการป้องกันการกรอกข้อมูลไม่ครบถ้วน', async ({ page }) => {
    // Log in with admin credentials
    await login(page, AdminEmail, AdminPassword);

    // Attempt to create a group without a group name (incomplete information)
    await createGroups(page, '', 'เป็นกลุ่มว่างง', []);

    // Wait for the incomplete information error message to appear and verify its visibility
    await page.locator(`text=${errorMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${errorMessage}`)).toBeVisible();
});

// Test Case 6: TC006 - Verify that the system prevents creating a group with special characters
test('TC006: ตรวจสอบว่าระบบมีการป้องกันการกรอกข้อมูลด้วยอักขระพิเศษ', async ({ page }) => {
    // Log in with admin credentials
    await login(page, AdminEmail, AdminPassword);

    // Attempt to create a group with special characters in the name
    await createGroups(page, '*+/*$', 'เป็นกลุ่มพิเศษษ', []);

    // Wait for the special characters error message to appear and verify its visibility
    await page.locator(`text=${SpecialCharactersErrorMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${SpecialCharactersErrorMessage}`)).toBeVisible();
});