export async function createKPI(page, title, description, level, score) {
  // Navigate to Settings
  await page.locator("text=ตั้งค่า").click();
  await page.waitForTimeout(1000);

  // Navigate to KPIs section
  await page.locator("text=ตัวชี้วัด").click();
  await page.waitForTimeout(1000);

  // Open the Create KPI form
  await page.locator("text=สร้างชุดตัวชี้วัด").click();
  await page.waitForTimeout(1000);

  const inputs = page.locator(".v-text-field input.v-field__input");
  const inputCount = await inputs.count();
  // Fill in KPI information
  // Title: Click, clear, then fill
  const titleInput = inputs.nth(0); // First input for title
  await titleInput.click(); // Click to focus
  await titleInput.clear(); // Clear existing value
  await titleInput.fill(title); // Fill new value

  // Description: Normal fill
  const descInput = inputs.nth(1); // Second input for description
  await descInput.fill(description);

  // Level: Normal fill
  const levelInput = inputs.nth(2); // Third input for level
  await levelInput.fill(level);

  // Score: Normal fill
  const scoreInput = inputs.nth(3); // Fourth input for score
  await scoreInput.fill(score);
  // Click the 'Save' button
  await page.locator('text="บันทึกพร้อมเผยแพร่"').click(); // Submit the form
}
