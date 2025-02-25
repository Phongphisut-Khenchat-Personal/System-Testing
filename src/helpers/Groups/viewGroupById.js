import { expect } from '@playwright/test';

// Function to view group details by ID
export async function viewGroupById(page) {
    // Navigate to the "Settings" section by clicking the corresponding text
    await page.click("text=ตั้งค่า");
    // Navigate to the "Groups" section by clicking the corresponding text
    await page.click("text=กลุ่ม");

    // Initialize page number for tracking pagination
    let pageNumber = 1;
    while (true) {
        // Wait for table rows to load, ensuring the table is present within 10 seconds
        await page.waitForSelector(".v-data-table__tr", { timeout: 10000 });
        // Get all table rows on the current page
        let rows = await page.locator(".v-data-table__tr").all();
        // Store initial row count to check for stability
        const initialRowCount = rows.length;
        // Exit the loop if no rows are found (empty table)
        if (initialRowCount === 0) break;

        // Wait briefly to allow the UI to stabilize (e.g., if rows are still loading)
        await page.waitForTimeout(500);
        // Re-fetch rows to confirm stability
        rows = await page.locator(".v-data-table__tr").all();
        // If row count changed, wait longer to ensure the table is fully loaded
        if (rows.length !== initialRowCount) {
            await page.waitForTimeout(1000);
            rows = await page.locator(".v-data-table__tr").all();
        }

        // Iterate over each row in the table
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            // Extract the group name from the first column of the row
            const tableGroupName = await row.locator("td").first().textContent();
            // Skip if the group name is empty or null
            if (!tableGroupName) continue;


            // Click the info icon to open the details dialog for this row
            await row.locator(".tabler-info-circle").click();

            // Wait for the dialog to become visible within 5 seconds
            await page.waitForSelector(".v-dialog, .group-details-page", { state: "visible", timeout: 5000 });
            // Get the group name from the details page (using h2 inside .v-col.v-col-12)
            const detailsGroupNameElement = page.locator(".v-col.v-col-12 h2").first();
            await expect(detailsGroupNameElement).toBeVisible({ timeout: 5000 });
            const detailsGroupName = await detailsGroupNameElement.innerText();

            // Assert that the group name in the dialog matches the table name
            expect(detailsGroupName.trim()).toBe(tableGroupName.trim());

            // Locate the close button in the visible dialog (button containing tabler-x icon)
            const closeButtonLocator = page.locator(".v-dialog:visible .v-btn:has(.tabler-x)");
            // Count how many close buttons are found
            const closeButtonCount = await closeButtonLocator.count();
            // If no close button is found, pause execution for manual inspection
            if (closeButtonCount === 0) {
                await page.pause();
            }
            // Click the first close button (forced to bypass potential interception issues)
            await closeButtonLocator.first().click({ force: true });
            // Wait for the dialog to close within 5 seconds
            await page.waitForSelector(".v-dialog", { state: "hidden", timeout: 5000 });
        }

        // Locate the "Next page" button if it exists and is enabled
        const nextButton = page.locator('button[aria-label="Next page"]:not([aria-disabled="true"])');
        // Exit the loop if no next button is visible (end of pagination)
        if (!(await nextButton.isVisible())) break;

        // Click the next button to go to the next page
        await nextButton.click();
        // Increment page number
        pageNumber++;
        // Wait for the DOM content to load after navigation
        await page.waitForLoadState("domcontentloaded");
        // Brief wait to ensure UI stability after page change
        await page.waitForTimeout(500);
    }
}

// import { expect } from '@playwright/test';

// export async function viewGroupById(page) {
//     await page.locator('text=ตั้งค่า').click();
//     await page.waitForLoadState('networkidle');

//     await page.locator('text=กลุ่ม').click();
//     await page.waitForLoadState('networkidle');

//     while (true) {
//         await page.waitForSelector('.v-data-table__tr', { timeout: 10000 });
//         const groupRows = await page.locator('.v-data-table__tr').all();

//         if (groupRows.length === 0) break;

//         for (const row of groupRows) {
//             const tableGroupName = await row.locator('td').first().textContent();
//             if (!tableGroupName) continue;

//             await page.waitForSelector('.v-overlay__scrim', { state: 'hidden', timeout: 5000 }).catch(() => {
//                 console.log("พบ overlay ค้างอยู่ พยายามปิด...");
//             });

//             const infoIcon = row.locator('.tabler-info-circle');
//             await expect(infoIcon).toBeVisible({ timeout: 5000 });
//             await infoIcon.click();

//             try {
//                 // รอให้หน้ารายละเอียดกลุ่มแสดง และข้อมูลโหลดสมบูรณ์
//                 await page.waitForSelector('.v-dialog, .group-details-page', { state: 'visible', timeout: 10000 });
//                 await page.waitForTimeout(1000); // รอเพิ่มเพื่อให้ข้อมูลใน dialog โหลด

//                 // ดึงชื่อกลุ่มจากหน้ารายละเอียด
//                 const detailsGroupNameElement = page.locator('.v-col.v-col-12 h2').first();
//                 await expect(detailsGroupNameElement).toBeVisible({ timeout: 5000 });
//                 const detailsGroupName = await detailsGroupNameElement.innerText();

//                 // Debug: พิมพ์ข้อมูลที่ดึงมาเพื่อตรวจสอบ
//                 console.log(`Table Group Name: "${tableGroupName.trim()}"`);
//                 console.log(`Details Group Name: "${detailsGroupName.trim()}"`);

//                 // ตรวจสอบว่าชื่อตรงกันหรือไม่
//                 expect(detailsGroupName.trim()).toBe(tableGroupName.trim());
//             } catch (error) {
//                 console.log(`ไม่สามารถตรวจสอบรายละเอียดของกลุ่ม "${tableGroupName}" ได้: ${error.message}`);
//                 const closeButton = page.locator('.v-dialog-close-btn, button:has-text("Close")').first();
//                 if (await closeButton.isVisible({ timeout: 2000 })) {
//                     await closeButton.click();
//                 }
//                 continue;
//             }

//             const closeButton = page.locator('.v-dialog-close-btn, button:has-text("Close")').first();
//             await expect(closeButton).toBeVisible({ timeout: 5000 });
//             await closeButton.click();

//             await Promise.all([
//                 page.waitForSelector('.v-dialog', { state: 'hidden', timeout: 10000 }),
//                 page.waitForSelector('.v-overlay__scrim', { state: 'hidden', timeout: 10000 })
//             ]).catch(async () => {
//                 console.log("Dialog หรือ overlay ไม่ปิด ลองปิดซ้ำ");
//                 await closeButton.click();
//                 await page.waitForTimeout(1000);
//                 await page.waitForSelector('.v-overlay__scrim', { state: 'hidden', timeout: 5000 });
//             });
//         }

//         const nextButton = page.locator('#app button[aria-label="Next page"]:not([aria-disabled="true"])');
//         if (!(await nextButton.isVisible())) break;

//         await nextButton.click();
//         await page.waitForLoadState('networkidle');
//     }
// }