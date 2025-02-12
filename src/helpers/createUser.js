import path from 'path';
import { fileURLToPath } from 'url';

// แปลง __dirname สำหรับ ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createUser(page, img, name, lastName, username, email) {
    // // ไปที่หน้า Assignments
    // await page.goto('https://pramern.withyamroll.com/assignments');
    // await page.waitForLoadState('networkidle'); // รอให้หน้าโหลดเสร็จ

    // เปิดเมนูสร้างผู้ใช้งาน
    await page.locator('text=ตั้งค่า').click();
    await page.locator('text=ผู้ใช้งาน').click();
    await page.locator('text=สร้างผู้ใช้งาน').click();  

    // อัปโหลดไฟล์รูปภาพ
    const filePath = path.join(__dirname, img);
    const fileInput = await page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);

    // กรอกข้อมูลผู้ใช้
    await page.locator('input[placeholder="ชื่อ"]').fill(name);
    await page.locator('input[placeholder="นามสกุล"]').fill(lastName);
    await page.locator('input[placeholder="ชื่อผู้ใช้"]').fill(username);
    await page.locator('input[placeholder="อีเมล"]').fill(email);
    // กดบันทึก
    await page.locator('text="บันทึก"').click();
}
