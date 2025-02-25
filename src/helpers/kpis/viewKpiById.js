import { expect } from '@playwright/test';

export async function viewKpiById(page) {
    await page.locator('text=ตั้งค่า').click();
    await page.waitForLoadState('networkidle');

    await page.locator('text=ตัวชี้วัด').click();
    await page.waitForLoadState('networkidle');

    while (true) {
        await page.waitForSelector('.v-data-table__tr', { timeout: 10000 });
        const groupRows = await page.locator('.v-data-table__tr').all();

        if (groupRows.length === 0) break;

        for (const row of groupRows) {
            const tableGroupName = await row.locator('td').first().textContent();
            if (!tableGroupName) continue;

            await page.waitForSelector('.v-overlay__scrim', { state: 'hidden', timeout: 5000 });

            const infoIcon = row.locator('.tabler-info-circle');
            await expect(infoIcon).toBeVisible({ timeout: 5000 });
            await infoIcon.click();

            await page.waitForSelector('.v-dialog, .group-details-page', { state: 'visible', timeout: 10000 });
            await page.waitForTimeout(1000);

            // Update locator to match the span inside .v-card-title
            const detailsGroupNameElement = page.locator('.v-card-title span').first();
            await expect(detailsGroupNameElement).toBeVisible({ timeout: 5000 });
            const detailsGroupName = await detailsGroupNameElement.innerText();

            // Remove the prefix "รายละเอียดชุดตัวชี้วัด" from detailsGroupName
            const prefix = "รายละเอียดชุดตัวชี้วัด";
            const trimmedDetailsGroupName = detailsGroupName.replace(prefix, '').trim();

            // Compare the trimmed details name with the table name
            expect(trimmedDetailsGroupName).toBe(tableGroupName.trim());

            const closeButton = page.locator('.v-dialog-close-btn, button:has-text("Close")').first();
            await expect(closeButton).toBeVisible({ timeout: 5000 });
            await closeButton.click();

            await Promise.all([
                page.waitForSelector('.v-dialog', { state: 'hidden', timeout: 10000 }),
                page.waitForSelector('.v-overlay__scrim', { state: 'hidden', timeout: 10000 })
            ]);
        }

        const nextButton = page.locator('#app button[aria-label="Next page"]:not([aria-disabled="true"])');
        if (!(await nextButton.isVisible())) break;

        await nextButton.click();
        await page.waitForLoadState('networkidle');
    }
}