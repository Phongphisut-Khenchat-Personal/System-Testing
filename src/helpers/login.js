// Function to perform login action on the specified page
export async function login(page, username, password) {
  // Navigate to the login page
  await page.goto('https://pramern.withyamroll.com');
  
  // Fill in the username field
  await page.getByLabel('บัญชีผู้ใช้ หรืออีเมล').fill(username);
  
  // Fill in the password field
  await page.getByLabel('รหัสผ่าน').fill(password);
  
  // Check the 'Remember me' checkbox
  await page.getByLabel('จดจำฉัน').check();
  
  // Click the login button
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  
  // // Wait for the URL to change to the assignments page
  // await page.waitForURL('https://pramern.withyamroll.com');
}

// ลบ /assignments เข้าถึงเเค่ https://pramern.withyamroll.com