import { expect } from "@playwright/test";

export async function viewKpiById(page) {
  // Navigate to the "Settings" section by clicking the corresponding text
  await page.click("text=ตั้งค่า");
  // Navigate to the "Indicators" (KPIs) section by clicking the corresponding text
  await page.click("text=ตัวชี้วัด");

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
      await page.waitForSelector(".v-dialog", { state: "visible", timeout: 5000 });
      // Get the raw group name from the dialog's title
      const detailsGroupName = await page.locator(".v-card-title span").first().innerText();
      // Define the prefix to be removed from the dialog title
      const prefix = "รายละเอียดชุดตัวชี้วัด";
      // Remove the prefix and trim whitespace to get the cleaned group name
      const trimmedDetailsGroupName = detailsGroupName.replace(prefix, "").trim();

      // Assert that the trimmed dialog name matches the table name
      expect(trimmedDetailsGroupName).toBe(tableGroupName.trim());

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