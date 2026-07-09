import { test, expect } from "@playwright/test";

test("buying Expand Orchard increases clickPower", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const cookieCount = page.locator("div.text-5xl");
  const farmMangoButton = page.getByRole("button", { name: "🥭 Farm Mango" });
  const expandOrchardButton = page.getByRole("button", {
    name: "Buy Upgrade",
  });

  // Generate 10 cookies to afford upgrade
  for (let i = 0; i < 10; i++) {
    await farmMangoButton.click();
  }

  await expect(cookieCount).toHaveText("10");

  // Buy Expand Orchard upgrade
  await expandOrchardButton.click();

  // Cost was 10, so cookies should be back to 0
  await expect(cookieCount).toHaveText("0");

  // clickPower is now 2, so one click adds 2 cookies
  await farmMangoButton.click();

  await expect(cookieCount).toHaveText("2");
});