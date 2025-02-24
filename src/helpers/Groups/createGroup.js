
// Function to create a new group
export async function createGroups(page, GroupName, DescriptionGroup, Members) {
    // Open the 'Settings' menu
    await page.locator('text=ตั้งค่า').click();

    // Open the 'Groups' submenu
    await page.locator('text=กลุ่ม').click();

    // Open the 'Create Group' menu
    await page.locator('text=สร้างกลุ่ม').click();

    // Fill in group information
    await page.locator('input[placeholder="ชื่อกลุ่ม"]').fill(GroupName);
    await page.locator('input[placeholder="คำอธิบายเกี่ยวกับกลุ่ม"]').fill(DescriptionGroup);

    // Only interact with the "Search Member" if Members array is not empty
    if (Members && Members.length > 0) {
        // Open the "Search Member" field and click to open the member search
        const searchInput = await page.locator('input[placeholder="ค้นหาสมาชิก"]');
        await searchInput.click();
        
        // Type something to open the dropdown and ensure it's populated
        await searchInput.fill('');  // clear the input (or type something generic to force dropdown)

        // Wait for the dropdown options to become visible
        const memberOption = await page.locator('role=option');
        await memberOption.waitFor({ state: 'visible' }); // Wait for dropdown to open

        // Loop through the array of members and select them from the list
        for (const member of Members) {
            // Scroll down to make sure the dropdown is visible and not cut off
            await searchInput.scrollIntoViewIfNeeded();
            
            // Wait for the specific member to be visible in the dropdown options
            const memberElement = await page.locator(`role=option[name="${member}"]`);
            
            // Wait for the member to appear and then click it
            await memberElement.waitFor({ state: 'visible' });
            await memberElement.click();
        }
    }

    // Click the 'Save' button
    await page.locator('text="บันทึก"').click(); // Submit the form
}

