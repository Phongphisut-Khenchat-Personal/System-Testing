import { expect } from '@playwright/test';

// Function to view all Control Forms
export async function viewAllControlForm(page, status) {
    // Click on the 'Settings' menu
    await page.locator('text=จัดการแบบประเมิน').click();

    // Click on the 'All' filter
    await page.getByText("ทั้งหมด").click();

    // Select the desired status filter using getByRole
    await page.getByRole('option', { name: status }).click();  // Use getByRole instead of locator

    // Wait for the data to reload
    await page.waitForLoadState('networkidle');

    // Check if there is any data displayed
    const rowCount = await page.locator('.v-data-table__tr').count();

    if (rowCount === 0) {
        return;  // Skip further checks or perform any desired action
    }

    // Wait for the data in the table to load
    await page.waitForSelector('.v-data-table__tr', { timeout: 5000 });

    // Verify that data is displayed (select the first row)
    await expect(page.locator('.v-data-table__tr').first()).toBeVisible();

    // Verify that there is at least one row
    const rowCountAfterCheck = await page.locator('.v-data-table__tr').count();
    expect(rowCountAfterCheck).toBeGreaterThan(0);  // Check that the row count is greater than 0
}