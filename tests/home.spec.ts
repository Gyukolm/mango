import { test, expect } from "@playwright/test";

test("homepage loads", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Next/i);
});

test("typing mango triggers the secret reward", async ({ page }) => {
  await page.goto("/");

  await page.keyboard.type("mango");

  await expect(page.getByText("Secret activated: +1,000,000 mangoes!")).toBeVisible();
  await expect(page.getByText("1000000")).toBeVisible();
});