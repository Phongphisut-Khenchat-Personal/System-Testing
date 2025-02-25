// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './src/',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    /* ตั้งค่า Base URL (เปลี่ยนได้ตามเซิร์ฟเวอร์ของโปรเจกต์) */
    baseURL: 'https://pramern.withyamroll.com',
    
    /* เปิด Trace เมื่อ Test ล้มเหลว */
    trace: 'on',
    
    /* บันทึก Screenshot เมื่อ Test ล้มเหลว */
    screenshot: 'only-on-failure',
    
    /* เปิด Video Recording เฉพาะตอน Test ล้มเหลว */
    video: 'retain-on-failure',
    
    /* Headless mode (เปิด UI เฉพาะ debug mode) */
    headless: true
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

  /* รันเซิร์ฟเวอร์ก่อนเริ่มทดสอบ (ถ้าจำเป็น) */
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
