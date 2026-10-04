import { expect, test } from "@playwright/test";

test("normal-motion desktop renders without errors and copies the email", async ({
  page,
  context,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator(".hero-description")).toHaveCSS("opacity", "1");
  await page
    .getByRole("button", { name: "Copy email address", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Email copied" }),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "Krish7lalani@gmail.com",
  );
  expect(errors).toEqual([]);
  await page.goto("/#top");
  await expect(page.locator("h1")).toBeInViewport();
  await expect(page.locator(".hero-description")).toHaveCSS("opacity", "1");
  await page.screenshot({ path: "test-results/portfolio-desktop.png" });
});

test("landscape mobile menu stays usable in a short viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 667, height: 375 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const contact = page
    .getByRole("navigation", { name: "Mobile" })
    .getByRole("link", { name: "Contact" });
  await contact.scrollIntoViewIfNeeded();
  await contact.click();
  await expect(page.locator("#contact")).toBeInViewport();
});

for (const width of [320, 375, 390, 580, 768, 820, 1024, 1440, 1920]) {
  test(`layout and content at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".hero-description")).toHaveCSS("opacity", "1");
    await expect(page.locator(".system-card")).toHaveCSS("opacity", "1");
    await expect(page.locator(".project-card")).toHaveCount(6);
    await expect(page.locator(".experience-row")).toHaveCount(4);
    for (const section of [
      "#top",
      "#work",
      "#experience",
      "#skills",
      "#about",
      "#education",
      "#contact",
    ]) {
      await page.locator(section).scrollIntoViewIfNeeded();
      const overflow = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(
        overflow.content,
        `${section} must not overflow`,
      ).toBeLessThanOrEqual(overflow.viewport + 1);
    }
    expect(
      await page
        .locator("body")
        .evaluate((body) => getComputedStyle(body).cursor),
    ).not.toBe("none");
    expect(errors).toEqual([]);
    await page.goto("/#top");
    await expect(page.locator("h1")).toBeInViewport();
    await page.screenshot({ path: `test-results/portfolio-${width}.png` });
  });
}

test("filters, contribution details, and search reveal a hidden project", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Monitoring", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Search", exact: false }).click();
  await page.getByRole("combobox").fill("PondGuard");
  await page.getByRole("combobox").press("Enter");
  await expect(page.locator(".project-card")).toHaveCount(6);
  await expect(page.locator("#project-pondguard")).toBeInViewport();
  await page.locator("#project-pondguard summary").click();
  await expect(page.locator("#project-pondguard details")).toHaveAttribute(
    "open",
    "",
  );
});

test("mobile menu, theme persistence, and engineering explorer", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation", { name: "Mobile" })
    .getByRole("link", { name: "Contact" })
    .click();
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
  await expect(page.locator("#contact")).toBeInViewport();
  await page.locator(".theme-toggle").click();
  const theme = await page.locator("html").getAttribute("class");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("class", theme ?? "");
  await page
    .getByRole("button", { name: "Backend engineering", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "The logic behind the product." }),
  ).toBeVisible();
});

test("resume files, local assets, metadata, and static 404", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const links = await page.locator("a[download]").evaluateAll((elements) =>
    elements.map((element) => ({
      href: (element as HTMLAnchorElement).href,
      name: element.getAttribute("download"),
    })),
  );
  for (const link of links) {
    const response = await request.get(link.href);
    expect(response.status()).toBe(200);
    const file = await response.body();
    expect(file.length).toBeGreaterThan(1000);
    expect(file.subarray(0, 2).toString()).toBe(
      link.name?.endsWith(".pdf") ? "%P" : "PK",
    );
  }
  const assets = await page
    .locator("img")
    .evaluateAll((images) => images.map((img) => img.src));
  for (const asset of assets)
    expect((await request.get(asset)).ok()).toBeTruthy();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /^https:\/\//,
  );
  expect((await request.get("/sitemap.xml")).ok()).toBeTruthy();
  const missing = await page.goto("/missing-page");
  expect(missing?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible();
});

test("prerendered content stays readable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator(".project-card")).toHaveCount(6);
  expect(
    await page
      .locator(".project-card")
      .first()
      .evaluate((card) => getComputedStyle(card).opacity),
  ).toBe("1");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("link", { name: "Email me", exact: true }),
  ).toBeVisible();
  await context.close();
});

for (const viewport of [
  { width: 1024, height: 768 },
  { width: 1280, height: 720 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
]) {
  test(`opening section fits laptop ${viewport.width}x${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator(".system-card")).toHaveCSS("opacity", "1");
    await page.evaluate(() => document.fonts.ready);
    const heroBottom = () =>
      page
        .locator("#top")
        .evaluate((el) => el.getBoundingClientRect().bottom + scrollY);
    expect(await heroBottom()).toBeLessThanOrEqual(viewport.height);
    await page
      .getByRole("button", { name: "Backend engineering", exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: "The logic behind the product." }),
    ).toBeVisible();
    expect(await heroBottom()).toBeLessThanOrEqual(viewport.height);
  });
}

for (const width of [320, 390, 667]) {
  test(`project and experience mobile slides at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    for (const [label, id, count] of [
      ["project", "project-slides", 6],
      ["experience", "experience-slides", 4],
    ] as const) {
      const navigation = page.getByRole("group", {
        name: `${label} navigation`,
      });
      const track = page.locator(`#${id}`);
      for (let index = 1; index < count; index++) {
        await navigation
          .getByRole("button", { name: `Next ${label}`, exact: true })
          .click();
        await expect(navigation.locator(".mobile-carousel-count")).toHaveText(
          `${String(index + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`,
        );
        await expect
          .poll(() =>
            track.evaluate((el, i) => {
              const card = el.children[i].getBoundingClientRect();
              const viewport = el.getBoundingClientRect();
              return (
                Math.abs(card.left - viewport.left) < 2 &&
                Math.abs(card.height - viewport.height) < 2
              );
            }, index),
          )
          .toBe(true);
      }
      await navigation
        .getByRole("button", { name: `Next ${label}`, exact: true })
        .click();
      await expect(navigation.locator(".mobile-carousel-count")).toHaveText(
        `01 / ${String(count).padStart(2, "0")}`,
      );
      await track.focus();
      await page.keyboard.press("ArrowRight");
      await expect(navigation.locator(".mobile-carousel-count")).toHaveText(
        `02 / ${String(count).padStart(2, "0")}`,
      );
    }
    await page.getByRole("button", { name: "Monitoring", exact: true }).click();
    await expect(page.locator("#project-slides > *")).toHaveCount(1);
    await expect(
      page
        .getByRole("group", { name: "project navigation" })
        .locator(".mobile-carousel-count"),
    ).toHaveText("01 / 01");
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBe(width);
  });
}

test("laptop backend panel fits after the animated log fills up", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Backend engineering", exact: true })
    .click();
  await expect(page.locator(".reqflow-log li")).toHaveCount(4, {
    timeout: 10000,
  });
  expect(
    await page
      .locator("#top")
      .evaluate((el) => el.getBoundingClientRect().bottom + scrollY),
  ).toBeLessThanOrEqual(720);
});

test("a mobile project deep link opens the correct slide", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#project-placestar");
  await expect(
    page
      .getByRole("group", { name: "project navigation" })
      .locator(".mobile-carousel-count"),
  ).toHaveText("02 / 06");
  await expect(page.locator("#project-placestar")).toBeInViewport();
});
