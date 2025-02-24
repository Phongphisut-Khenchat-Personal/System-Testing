import path from 'path';
import { fileURLToPath } from 'url';
import { expect } from '@playwright/test';

// Convert __dirname for ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to create a new user
export async function createUser(page, fileName, name, lastName, username, email) {
    // Correct path to the image in the assets folder using the provided fileName
    const filePath = path.join(__dirname, '..', '..', '..', 'assets', fileName);
    
    // Debugging: Log the resolved path to verify
    console.log(filePath);  // Optional: Check the resolved file path for debugging

    // Open the 'Settings' menu
    await page.locator('text=ตั้งค่า').click();

    // Open the 'Users' submenu
    await page.locator('text=ผู้ใช้งาน').click();

    // Open the 'Create User' menu
    await page.locator('text=สร้างผู้ใช้งาน').click();

    // Upload the image file
    const fileInput = await page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);

    // Fill in user information
    await page.locator('input[placeholder="ชื่อจริงของผู้ใช้"]').fill(name); // Fill first name
    await page.locator('input[placeholder="นามสกุลของผู้ใช้"]').fill(lastName); // Fill last name
    await page.locator('input[placeholder="กำหนดชื่อผู้ใช้สำหรับล็อกอิน"]').fill(username); // Fill username
    await page.locator('input[placeholder="ระบุอีเมลของผู้ใช้"]').fill(email); // Fill email

    // Select user role
    await page.getByText("ผู้ใช้งานระบบทั่วไป").click(); // Open role dropdown
    await page.getByRole('option', { name: 'ผู้ดูแลระบบ' }).click(); // Select 'Administrator' role

    // Click the 'Save' button
    await page.locator('text="บันทึก"').click(); // Submit the form
}
