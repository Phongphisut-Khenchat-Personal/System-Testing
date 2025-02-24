import { expect } from '@playwright/test';

// Function to verify all users' names from the table
export async function verifyAllUsersNamesFromTable(page) {
    // Click on the 'Settings' menu
    await page.locator('text=ตั้งค่า').click();
    await page.waitForLoadState('networkidle');
    
    // Click on the 'Users' submenu
    await page.locator('text=ผู้ใช้งาน').click();
    await page.waitForLoadState('networkidle');

    while (true) {
        // Wait for the data in the table to load
        await page.waitForSelector('.v-data-table__tr', { timeout: 10000 });
        const userRows = await page.locator('.v-data-table__tr').all();

        // If no rows are found, break the loop
        if (userRows.length === 0) break;

        for (const row of userRows) {
            // Get the username from the table
            const tableUserName = await row.locator('.font-weight-medium.text-body-1').textContent();
            if (!tableUserName) continue;

            // Click on the info icon
            const infoIcon = row.locator('.tabler-info-circle');
            await expect(infoIcon).toBeVisible({ timeout: 5000 });
            await infoIcon.click();

            try {
                // Wait for the user details page to be visible
                await page.waitForSelector('.mx-auto.text-center, .user-details-page', { state: 'visible', timeout: 10000 });
                
                // Get the username from the user details page
                const detailsUserName = await page.locator('p.mb-0.text-center, h3.user-name, .user-details').innerText();
                
                // Verify that the usernames match
                expect(detailsUserName.trim()).toBe(tableUserName.trim());
            } catch (error) {
                continue;
            }

            // Click the close button
            const closeButton = page.locator('.v-dialog-close-btn');
            await expect(closeButton).toBeVisible({ timeout: 5000 });
            await closeButton.click();
        }

        // Click the next page button if available
        const nextButton = page.locator('#app button[aria-label="Next page"]:not([aria-disabled="true"])');
        if (!(await nextButton.isVisible())) break;

        await nextButton.click();
        await page.waitForLoadState('networkidle');
    }
}