import { test, expect } from "@playwright/test";

test("clicking Farm Mango adds the correct amount of mangoes", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const cookieCount = page.locator("div.text-5xl");
  const farmMangoButton = page.getByRole("button", { name: "🥭 Farm Mango" });

  // Initial cookies state
  await expect(cookieCount).toHaveText("0");

  // clickPower starts at 1
  await farmMangoButton.click();

  // cookies should increase by clickPower
  await expect(cookieCount).toHaveText("1");

  // second click
  await farmMangoButton.click();

  // cookies should now be 2
  await expect(cookieCount).toHaveText("2");
});