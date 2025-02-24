import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login.js';
import { createGroups } from '../../helpers/Groups/createGroup.js'; // ใช้ createGroups แทน createGroup

// Admin login credentials
const AdminEmail = 'admin';
const AdminPassword = 'Adm!n123';

// Expected success and error messages
const successMessage = 'สร้างกลุ่มสำเร็จ';
const errorMessage = 'กรุณากรอกข้อมูลให้ครบถ้วน';
const duplicateErrorMessage = 'ชื่อกลุ่มนี้ถูกใช้งานเเล้ว';
const SpecialCharactersErrorMessage = 'ชื่อกลุ่มต้องประกอบไปด้วยตัวอกษรภาษาไทย ภาษาอังกฤษ ตัวเลข เเละเครื่องหมาย-_เท่านั้น';

// Test Case 1: TC001 - Verify that the system can successfully create a group with a unique name
test('TC001: ตรวจสอบว่าระบบสามารถสร้างกลุ่มได้สำเร็จ', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);

    // Create the group
    await createGroups(page, 'หมวดวิทยาศาสตร์', 'เป็นกลุ่มของครูวิทยาศาสตร์', []); // ใช้ createGroups แทน createGroup

    // Verify success message
    await page.locator(`text=${successMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${successMessage}`)).toBeVisible();
});

// Test Case 2: TC002 - Verify that the system can successfully create a group with one member
test('TC002: ตรวจสอบว่าระบบสามารถสร้างกลุ่มพร้อมสมาชิกได้สำเร็จ', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);

    // Create the group with one member
    await createGroups(page, 'หมวดวิทยาศาสตร์', 'เป็นกลุ่มของครูวิทยาศาสตร์', ['พงศ์พิสุทธิ์ เคนชาติ']); // ใช้ createGroups แทน createGroup

    // Verify success message
    await page.locator(`text=${successMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${successMessage}`)).toBeVisible();
});

// Test Case 3: TC003 - Verify that the system can successfully create a group with multiple members
test('TC003: ตรวจสอบว่าระบบสามารถสร้างกลุ่มพร้อมหลายสมาชิกได้สำเร็จ', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);

    // Create the group with multiple members
    await createGroups(page, 'หมวดวิทยาศาสตร์', 'เป็นกลุ่มของครูวิทยาศาสตร์', ['พงศ์พิสุทธิ์ เคนชาติ', 'วนิชา ยีขะเด']); // ใช้ createGroups แทน createGroup

    // Verify success message
    await page.locator(`text=${successMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${successMessage}`)).toBeVisible();
});

// Test Case 4: TC004 - Verify that the system prevents creating a group with a duplicate group name
test('TC004: ตรวจสอบว่าระบบมีการป้องกันการสร้างชื่อกลุ่มซ้ำกัน', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);

    // Try to create the group with a name that already exists
    await createGroups(page, 'หมวดวิทยาศาสตร์', 'เป็นกลุ่มของครูวิทยาศาสตร์', []); // ใช้ createGroups แทน createGroup

    // Verify duplicate group name error message
    await page.locator(`text=${duplicateErrorMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${duplicateErrorMessage}`)).toBeVisible();
});

// Test Case 5: TC005 - Verify that the system prevents creating a group with incomplete information
test('TC005: ตรวจสอบว่าระบบมีการป้องกันการกรอกข้อมูลไม่ครบถ้วน', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);

    // Try to create the group with incomplete information (no group name)
    await createGroups(page, '', 'เป็นกลุ่มของครูวิทยาศาสตร์', []); // ใช้ createGroups แทน createGroup

    // Verify incomplete information error message
    await page.locator(`text=${errorMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${errorMessage}`)).toBeVisible();
});

// Test Case 6: TC006 - Verify that the system prevents creating a group with special characters
test('TC006: ตรวจสอบว่าระบบมีการป้องกันการกรอกข้อมูลด้วยอักขระพิเศษ', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);

    // Try to create the group with special characters in the name
    await createGroups(page, '*+/*$', 'เป็นกลุ่มของครูวิทยาศาสตร์', []); // ใช้ createGroups แทน createGroup

    // Verify the special characters error message
    await page.locator(`text=${SpecialCharactersErrorMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${SpecialCharactersErrorMessage}`)).toBeVisible();
});
