
export async function viewAllUser(page) {
    // ไปที่หน้า Assignments
    // await page.goto('https://pramern.withyamroll.com/assignments');
    // await page.waitForLoadState('networkidle'); // รอให้หน้าโหลดเสร็จ
    // เปิดเมนูสร้างผู้ใช้งาน
    await page.locator('text=ตั้งค่า').click();
    await page.locator('text=ผู้ใช้งาน').click();
}
