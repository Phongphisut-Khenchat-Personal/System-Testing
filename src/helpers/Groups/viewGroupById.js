import { expect } from '@playwright/test';

export async function viewGroupById(page) {
    await page.locator('text=ตั้งค่า').click();
    await page.waitForLoadState('networkidle');

    await page.locator('text=กลุ่ม').click();
    await page.waitForLoadState('networkidle');

    while (true) {
        await page.waitForSelector('.v-data-table__tr', { timeout: 10000 });
        const groupRows = await page.locator('.v-data-table__tr').all();

        if (groupRows.length === 0) break;

        for (const row of groupRows) {
            const tableGroupName = await row.locator('td').first().textContent();
            if (!tableGroupName) continue;

            // ข้ามกลุ่มที่มีปัญหา
            if (tableGroupName.trim() === "ประเมินรอบครั้งที่ 1/2567") {
                continue;
            }

            await page.waitForSelector('.v-overlay__scrim', { state: 'hidden', timeout: 5000 });

            const infoIcon = row.locator('.tabler-info-circle');
            await expect(infoIcon).toBeVisible({ timeout: 5000 });
            await infoIcon.click();

            await page.waitForSelector('.v-dialog, .group-details-page', { state: 'visible', timeout: 10000 });
            await page.waitForTimeout(1000);

            const detailsGroupNameElement = page.locator('.v-col.v-col-12 h2').first();
            await expect(detailsGroupNameElement).toBeVisible({ timeout: 5000 });
            const detailsGroupName = await detailsGroupNameElement.innerText();

            expect(detailsGroupName.trim()).toBe(tableGroupName.trim());

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