import { test, expect } from '@playwright/test';
import { login } from '../helpers/login.js'; 
import { createUser } from '../helpers/CreateUser.js';

// Admin login credentials
const AdminEmail = 'admin';
const AdminPassword = 'Adm!n123';

// User login credentials
const UserEmail = 'User';
const UserPassword = 'User';

// Expected success and error messages
const successMessage = 'เพิ่มสำเร็จ';
const errorMessage = 'กรุณากรอกชื่อ-นามสกุลให้ถูกต้อง';

// TC001: Validate Thai characters in first name field
test('TC001: ตรวจสอบว่าสามารถกรอกข้อมูลชื่อด้วยตัวอักษรภาษาไทย', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);
    await createUser(page, 'Logo.png', 'พงศ์พิสุทธิ์', 'เคนชาติ', 'Shogun', 'PhongPhisut001@gmail.com');

    await page.locator(`text=${successMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${successMessage}`)).toBeVisible();
});

// TC002: Validate English characters in first name field
test('TC002: ตรวจสอบว่าสามารถกรอกข้อมูลชื่อด้วยตัวอักษรภาษาอังกฤษ', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);
    await createUser(page, 'Logo.png', 'Wanissha', 'Yeekaday', 'Mimi', 'wanissha@gmail.com');


    await page.locator(`text=${successMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${successMessage}`)).toBeVisible();
});

// TC003: Prevent emoji in first name field
test('TC003: ตรวจสอบว่าระบบป้องกันการกรอกข้อมูลชื่อผิดรูปแบบ โดยใช้อีโมจิ', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);
    await createUser(page, 'Logo.png', '😊', 'ยีขะเด', 'Mimi', 'wanissha@gmail.com');

    await page.locator(`text=${errorMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${errorMessage}`)).toBeVisible();
});

// TC004: Prevent special characters in first name field
test('TC004: ตรวจสอบว่าระบบป้องกันการกรอกข้อมูลชื่อผิดรูปแบบ โดยใช้ตัวอักษรพิเศษ', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);
    await createUser(page, 'Logo.png', '$', 'ยีขะเด', 'Mimi', 'wanissha@gmail.com');

    await page.locator(`text=${errorMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${errorMessage}`)).toBeVisible();
});

// TC005: Prevent numeric characters in first name field
test('TC005: ตรวจสอบว่าระบบป้องกันการกรอกข้อมูลชื่อผิดรูปแบบ โดยใช้ตัวเลข', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);
    await createUser(page, 'Logo.png', '123Mimi', 'ยีขะเด', 'Mimi', 'wanissha@gmail.com');

    await page.locator(`text=${errorMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${errorMessage}`)).toBeVisible();
});

// TC006: Prevent numeric-only first name
test('TC006: ตรวจสอบว่าระบบป้องกันการกรอกข้อมูลชื่อ โดยใช้ตัวเลข', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);
    await createUser(page, 'Logo.png', '123', 'ยีขะเด', 'Mimi', 'wanissha@gmail.com');

    await page.locator(`text=${errorMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${errorMessage}`)).toBeVisible();
});

// TC007: Validate Thai characters in last name field
test('TC007: ตรวจสอบว่าสามารถกรอกข้อมูลนามสกุลด้วยตัวอักษรภาษาไทย', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);
    await createUser(page, 'Logo.png', 'กชนิภา', 'กชพร', 'Pa', 'kachanipa@gmail.com');

    await page.locator(`text=${successMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${successMessage}`)).toBeVisible();
});

// TC008: Validate English characters in last name field
test('TC008: ตรวจสอบว่าสามารถกรอกข้อมูลนามสกุลด้วยตัวอักษรภาษาอังกฤษ', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);
    await createUser(page, 'Logo.png', 'August', 'Amin', 'Alan', 'Alan@gmail.com');

    await page.locator(`text=${successMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${successMessage}`)).toBeVisible();
});

// TC009: Prevent emoji in last name field
test('TC009: ตรวจสอบว่าระบบป้องกันการกรอกข้อมูลนามสกุลผิดรูปแบบ โดยใช้อีโมจิ', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);
    await createUser(page, 'Logo.png', 'วณิชชา', '😊', 'Mimi', 'wanissha@gmail.com');

    await page.locator(`text=${errorMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${errorMessage}`)).toBeVisible();
});

// TC010: Prevent special characters in last name field
test('TC010: ตรวจสอบว่าระบบป้องกันการกรอกข้อมูลนามสกุลผิดรูปแบบ โดยใช้ตัวอักษรพิเศษ', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);
    await createUser(page, 'Logo.png', 'วณิชชา', '$', 'Mimi', 'wanissha@gmail.com');

    await page.locator(`text=${errorMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${errorMessage}`)).toBeVisible();
});

// TC011: Prevent numeric characters in last name field
test('TC011: ตรวจสอบว่าระบบป้องกันการกรอกข้อมูลนามสกุลผิดรูปแบบ โดยใช้ตัวเลข', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);
    await createUser(page, 'Logo.png', 'วณิชชา', '123ยีขะเด', 'Atlas', 'Atlas@gmail.com');

    await page.locator(`text=${errorMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${errorMessage}`)).toBeVisible();
});

// TC012: Prevent numeric-only last name
test('TC012: ตรวจสอบว่าระบบป้องกันการกรอกข้อมูลนามสกุลโดยใช้ตัวเลข', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);
    await createUser(page, 'Logo.png', 'Alex', '1234', 'Alex', 'Alex@gmail.com');

    await page.locator(`text=${errorMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${errorMessage}`)).toBeVisible();
});

// TC013: Validate English characters in username field
test('TC013: ตรวจสอบว่าสามารถกรอกข้อมูลชื่อผู้ใช้ด้วยตัวอักษรภาษาอังกฤษ', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);
    await createUser(page, 'Logo.png', 'วณิชชา', 'ยีขะเด', 'Aaron', 'Aaron@gmail.com');


    await page.locator(`text=${successMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${successMessage}`)).toBeVisible();
});

// TC014: Validate username with alphanumeric characters
test('TC014: ตรวจสอบว่าสามารถกรอกข้อมูลชื่อผู้ใช้โดยมีตัวเลขเป็นส่วนประกอบ', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);
    await createUser(page, 'Logo.png', 'วณิชชา', 'ยีขะเด', 'Arthur77', 'wanissha01@gmail.com');


    await page.locator(`text=${successMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${successMessage}`)).toBeVisible();
});

// TC015: Prevent numeric-only username
test('TC015: ตรวจสอบว่าสามารถกรอกข้อมูลชื่อผู้ใช้ด้วยตัวเลข', async ({ page }) => {
    await login(page, AdminEmail, AdminPassword);
    await createUser(page, 'Logo.png', 'วณิชชา', 'ยีขะเด', '12345', 'wanissha02@gmail.com');

    await page.locator(`text=${successMessage}`).waitFor({ state: 'visible' });
    await expect(page.locator(`text=${successMessage}`)).toBeVisible();
});
