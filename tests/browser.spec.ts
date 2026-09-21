import { expect, test } from "@playwright/test";

test("prepared exam starts immediately, stays compact on mobile, and restores answers", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("./");
  await expect(
    page.getByRole("heading", { name: "Wybierz test" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Start ISP", exact: true }).click();
  await expect(page.locator("textarea")).toHaveCount(2);
  await page.locator("textarea").first().fill("My answer survives a refresh.");
  await page.reload();
  await expect(page.locator("textarea").first()).toHaveValue(
    "My answer survives a refresh.",
  );
  await expect(page.getByText(/\d{2}:\d{2}/)).toHaveCount(0);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const header = await page.locator("header").boundingBox();
  expect(header).not.toBeNull();
  expect(header!.y).toBe(0);
  expect(header!.height).toBeLessThan(120);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("configuration exports a single encoded link and keeps the existing quizzes available", async ({
  page,
}) => {
  await page.goto("./#/configure");
  await expect(
    page.getByLabel("Sieci telekomunikacyjne", { exact: true }),
  ).toBeVisible();
  await page.getByLabel("Liczba pytań", { exact: true }).fill("3");
  await page.getByRole("button", { name: "Kopiuj link do testu" }).click();
  const link = await page.locator("input[readonly]").inputValue();
  expect(link).toContain("#/exam?config=");
  expect(link).not.toContain("&");
  await page.goto(link);
  await expect(page.locator("textarea")).toHaveCount(2);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("expiry locks choices without revealing results, including after refresh", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.clock.install();
  await page.goto("./#/configure");
  await page
    .getByLabel("Interaktywne Systemy Programowalne", { exact: true })
    .uncheck();
  await page.getByLabel("Sieci telekomunikacyjne", { exact: true }).check();
  await page.getByLabel("Liczba pytań", { exact: true }).fill("4");
  await page.getByLabel("Limit czasu", { exact: true }).check();
  await page.getByLabel("Minuty (maksymalnie 30)", { exact: true }).fill("1");
  await page.getByText("Więcej opcji", { exact: true }).click();
  await page
    .getByLabel("Pytań na stronie", { exact: true })
    .selectOption("all");
  await page
    .getByRole("button", { name: "Rozpocznij test", exact: true })
    .click();
  await expect(page.getByRole("timer")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.locator("input[type=radio]").first().check();
  const selected = page.locator("input[type=radio]:checked");
  await expect(selected).toHaveCount(1);
  await expect(page.locator(".feedback")).toHaveCount(0);
  await page.clock.fastForward(61_000);
  await expect(page.getByRole("timer")).toHaveText("0:00");
  await expect(page.locator("textarea")).toBeDisabled();
  await expect(page.locator("input[type=radio]").first()).toBeDisabled();
  await expect(page.locator(".feedback")).toHaveCount(0);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Zobacz wyniki", exact: true }).first(),
  ).toBeVisible();
  await expect(page.locator("input[type=radio]:checked")).toHaveCount(1);
  await expect(page.locator(".feedback")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Zobacz wyniki", exact: true })
    .first()
    .click();
  await expect(
    page.getByRole("region", { name: "Wyniki testu" }),
  ).toBeVisible();
  await expect(page.locator(".feedback")).toHaveCount(4);
});

test("self-assessment works after answers freeze and retry creates a blank attempt", async ({
  page,
}) => {
  await page.goto("./#/configure");
  await page.getByLabel("Liczba pytań", { exact: true }).fill("2");
  await page.getByText("Więcej opcji", { exact: true }).click();
  await page
    .getByLabel("Ocena odpowiedzi pisemnych", { exact: true })
    .selectOption("manual");
  await page
    .getByRole("button", { name: "Rozpocznij test", exact: true })
    .click();
  await page.locator("textarea").first().fill("My answer");
  await page
    .getByRole("button", { name: "Zakończ test", exact: true })
    .first()
    .click();
  await expect(page.locator("textarea").first()).toBeDisabled();
  const grades = page.getByLabel("Oceń swoją odpowiedź", { exact: true });
  await expect(grades).toHaveCount(2);
  await grades.nth(0).selectOption("1");
  await grades.nth(1).selectOption("1");
  await expect(
    page.getByRole("region", { name: "Wyniki testu" }),
  ).toContainText("100%");
  await expect(page.locator(".confetti")).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("region", { name: "Wyniki testu" }),
  ).toContainText("100%");
  await page
    .getByRole("button", { name: "Spróbuj ponownie", exact: true })
    .click();
  await expect(page.locator("textarea").first()).toBeEnabled();
  await expect(page.locator("textarea").first()).toHaveValue("");
  await expect(page.getByRole("region", { name: "Wyniki testu" })).toHaveCount(
    0,
  );
});

test("Polish learning preset shows readable code and reveals explanations only in results", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Math.random = () => 0;
  });
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("./#/exam/python-nauka");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Programowanie python - politechnika gdanska — Nauka",
  );
  await expect(page.getByRole("timer")).toHaveCount(0);
  await expect(page.getByText("Strona 1 z 6", { exact: true })).toBeVisible();
  await expect(page.getByText("Dokumentacja", { exact: true })).toHaveCount(0);
  let foundCode = false;
  for (let i = 0; i < 6; i++) {
    if (await page.locator("pre code").count()) {
      foundCode = true;
      await expect(page.locator("pre").first()).toBeVisible();
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (i < 5)
      await page.getByRole("button", { name: "Następna", exact: true }).click();
  }
  expect(foundCode).toBe(true);
  await page
    .getByRole("button", { name: "Zakończ test", exact: true })
    .first()
    .click();
  await expect(page.locator(".feedback")).toHaveCount(1);
  await page.getByText("Dokumentacja", { exact: true }).click();
  await expect(page.locator(".feedback a").first()).toHaveAttribute(
    "href",
    /^https:\/\//,
  );
});

test("verification preset starts thirty questions with a twenty-minute deadline", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("./#/exam/python-weryfikacja");
  await expect(page.getByRole("timer")).toHaveText("20:00");
  await expect(page.getByRole("checkbox", { name: "Nie wiem", exact: true })).toHaveCount(0);
  await expect(
    page.getByText("Odpowiedzi: 0 / 30", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Strona 1 z 6", { exact: true })).toBeVisible();
  await page.clock.fastForward(20 * 60_000);
  await expect(page.getByRole("timer")).toHaveText("0:00");
  await expect(page.locator(".feedback")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Zobacz wyniki", exact: true }).first(),
  ).toBeVisible();
});

test("learning records unknown answers without guessing", async ({ page }) => {
  await page.addInitScript(() => { Math.random = () => 0; });
  await page.goto("./#/exam/python-nauka");
  const unknown = page.getByRole("checkbox", { name: "Nie wiem", exact: true });
  await unknown.check();
  await expect(page.getByText("Odpowiedzi: 1 / 6", { exact: true })).toBeVisible();
  await page.reload();
  await expect(unknown).toBeChecked();
  const radio = page.getByRole("radio").first();
  await radio.check();
  await expect(unknown).not.toBeChecked();
  await unknown.check();
  await expect(radio).not.toBeChecked();
  for (let i = 0; i < 5; i++) {
    await expect(page.getByRole("button", { name: "Zakończ test", exact: true })).toHaveCount(0);
    await page.getByRole("button", { name: "Następna", exact: true }).click();
  }
  await expect(page.getByRole("button", { name: "Następna", exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Zakończ test", exact: true })).toHaveCount(1);
  await page.getByRole("button", { name: "Poprzednia", exact: true }).click();
  await expect(page.getByRole("button", { name: "Zakończ test", exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Następna", exact: true }).click();
  await page.getByRole("button", { name: "Zakończ test", exact: true }).first().click();
  await expect(unknown).toBeDisabled();
  await expect(page.locator(".feedback")).toContainText("Nie wiem · 0 / 1");
  await expect(page.getByText("Nie wiem: 1 / 6", { exact: true })).toBeVisible();

});
