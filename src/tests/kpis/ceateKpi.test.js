import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login.js';
import { createKPI } from '../../helpers/kpis/createKpi.js'; // Corrected import path

// Admin login credentials
const ADMIN_EMAIL = 'admin';
const ADMIN_PASSWORD = 'Adm!n123';

// User login credentials
const USER_EMAIL = 'User';
const USER_PASSWORD = 'User';

// Expected messages
const SUCCESS_MESSAGE = 'บันทึกข้อมูลสำเร็จ';
const ERROR_MESSAGE = 'กรุณากรอกข้อมูลให้ครบถ้วน';
const INVALID_MESSAGE = 'ชื่อตัวชี้วัดต้องมีเฉพาะตัวอักษรภาษาไทยหรือภาษาอังกฤษเท่านั้น';
const INVALID_SCORE = 'คะแนนต้องไม่เป็นค่าติดลบ';

// TC001: Validate Thai characters in KPI creation
test('TC001: ตรวจสอบว่าสามารถสร้างตัวชี้วัดได้', async ({ page }) => {
    // Perform login with admin credentials
    await login(page, ADMIN_EMAIL, ADMIN_PASSWORD);
    
    // Create KPI with valid Thai characters
    await createKPI(page, 'ทดสอบสร้างตัวชี้วัด1', 'ตัวชี้วัดตัวที่1', 'ง่าย', '1');
    
    // Verify success message is visible
    await page.locator(`text=${SUCCESS_MESSAGE}`).waitFor({ state: 'visible', timeout: 60000 });
    await expect(page.locator(`text=${SUCCESS_MESSAGE}`)).toBeVisible();
});

// TC002: Validate error when creating KPI without required fields
test('TC002: ตรวจสอบการสร้างตัวชี้วัดโดยไม่กรอกข้อมูล', async ({ page }) => {
    // Perform login with admin credentials
    await login(page, ADMIN_EMAIL, ADMIN_PASSWORD);
    
    // Attempt to create KPI without title
    await createKPI(page, '', 'ตัวชี้วัดตัวที่2', 'ปานกลาง', '2');
    
    // Verify error message is visible
    await page.locator(`text=${ERROR_MESSAGE}`).waitFor({ state: 'visible', timeout: 60000 });
    await expect(page.locator(`text=${ERROR_MESSAGE}`)).toBeVisible();
});

// TC003: Validate KPI creation with User role
test('TC003: ตรวจสอบการสร้างตัวชี้วัดด้วยสิทธิ์ User', async ({ page }) => {
    // Perform login with user credentials
    await login(page, USER_EMAIL, USER_PASSWORD);
    
    // Attempt to create KPI with user role
    await createKPI(page, 'ทดสอบจากผู้ใช้', 'ตัวชี้วัดจาก User', 'ยาก', '3');
    
    // Verify error message is visible (assuming user role cannot create KPI)
    await page.locator(`text=${ERROR_MESSAGE}`).waitFor({ state: 'visible', timeout: 60000 });
    await expect(page.locator(`text=${ERROR_MESSAGE}`)).toBeVisible();
    // If user can create KPI, change to expect SUCCESS_MESSAGE
});

// TC004: Validate KPI creation with special characters
test('TC004: ตรวจสอบการสร้างตัวชี้วัดด้วยอักขระพิเศษ', async ({ page }) => {
    // Perform login with admin credentials
    await login(page, ADMIN_EMAIL, ADMIN_PASSWORD);
    
    // Attempt to create KPI with special characters
    await createKPI(page, 'ทดสอบ@#$%', 'ตัวชี้วัด &*()', 'ง่าย', '4');
    
    // Verify invalid message is visible
    await page.locator(`text=${INVALID_MESSAGE}`).waitFor({ state: 'visible', timeout: 60000 });
    await expect(page.locator(`text=${INVALID_MESSAGE}`)).toBeVisible();
});

// TC005: Validate KPI creation with negative score
test('TC005: ตรวจสอบการสร้างตัวชี้วัดด้วยคะแนนติดลบ', async ({ page }) => {
    // Perform login with admin credentials
    await login(page, ADMIN_EMAIL, ADMIN_PASSWORD);
    
    // Attempt to create KPI with negative score
    await createKPI(page, 'ทดสอบคะแนนลบ', 'ตัวชี้วัดลบ', 'ปานกลาง', '-5');
    
    // Verify invalid score message is visible (assuming system does not accept negative scores)
    await page.locator(`text=${INVALID_SCORE}`).waitFor({ state: 'visible', timeout: 60000 });
    await expect(page.locator(`text=${INVALID_SCORE}`)).toBeVisible();
    // If system accepts negative scores, change to expect SUCCESS_MESSAGE
});