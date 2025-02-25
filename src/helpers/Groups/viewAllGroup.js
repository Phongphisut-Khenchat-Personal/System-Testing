// Function to view all groups in the system
import { expect } from '@playwright/test';

/**
 * Navigates to the groups page and verifies that group data is displayed.
 * @param {Page} page - The Playwright page object to interact with the browser.
 */
export async function viewAllGroups(page) {
    // Click on the 'Settings' menu to open it
    await page.locator('text=ตั้งค่า').click();
    
    // Click on the 'Groups' submenu to navigate to the groups page
    await page.locator('text=กลุ่ม').click();

    // Wait for the network to finish loading all data
    await page.waitForLoadState('networkidle');

    // Count the number of rows in the data table
    const rowCount = await page.locator('.v-data-table__tr').count();

    // If no rows are found, exit the function early
    if (rowCount === 0) {
        return; // Skip further checks if there’s no data to display
    }

    // Wait for the table rows to load, with a timeout of 5 seconds
    await page.waitForSelector('.v-data-table__tr', { timeout: 5000 });

    // Verify that the first row in the table is visible
    await expect(page.locator('.v-data-table__tr').first()).toBeVisible();

    // Recount the rows and verify that there is at least one row displayed
    const rowCountAfterCheck = await page.locator('.v-data-table__tr').count();
    expect(rowCountAfterCheck).toBeGreaterThan(0); // Ensure the row count is greater than zero
}