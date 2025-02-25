import { expect } from '@playwright/test';

/**
 * Creates a new group with the specified name, description, and members.
 * @param {Page} page - The Playwright page object to interact with the browser.
 * @param {string} groupName - The name of the group to be created.
 * @param {string} groupDescription - The description of the group.
 * @param {string[]} [members] - An optional array of member names to add to the group.
 */
export async function createGroups(page, groupName, groupDescription, members) {
    // Navigate to the settings menu
    await page.locator('text=ตั้งค่า').first().click();
    
    // Open the groups submenu
    await page.locator('text=กลุ่ม').first().click();
    
    // Click to open the group creation form
    await page.locator('text=สร้างกลุ่ม').first().click();

    // Enter the group name into the designated input field
    await page.locator('input[placeholder="ชื่อกลุ่ม"]').type(groupName, { delay: 0 });
    
    // Enter the group description into the designated input field
    await page.locator('input[placeholder="คำอธิบายเกี่ยวกับกลุ่ม"]').type(groupDescription, { delay: 0 });

    // Check if there are members to add to the group
    if (members?.length) {
        // Locate the member search input field
        const searchInput = page.locator('input[placeholder="ค้นหาสมาชิก"]');
        
        // Iterate over each member to add them to the group
        for (const member of members) {
            // Click the search input to activate it
            await searchInput.click();
            
            // Clear the search input to reset it
            await searchInput.fill('');
            
            // Fill the search input with the member's name
            await searchInput.fill(member);

            // Locate the dropdown menu containing member options
            const dropdown = page.locator('[role="menu"]');
            
            // Find the list items within the dropdown
            const option = dropdown.locator('.v-list-item');

            // Check if any options are available in the dropdown
            if (await option.count()) {
                // Click the first available option in the dropdown
                await option.first().click({ force: true });
            } else {
                // If no options are found in the dropdown, try finding the member by text directly
                const textOption = page.locator(`:text("${member}")`);
                
                // Click the first matching text option if found; otherwise, press Enter as a fallback
                await (await textOption.count() ? textOption.first() : page.keyboard).click({ force: true }) || await page.keyboard.press('Enter');
            }
        }
    }

    // Submit the form by clicking the save button
    await page.locator('text="บันทึก"').click();
}