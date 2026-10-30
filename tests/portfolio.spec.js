import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("renders all five 3D chapters without runtime or shader errors", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.locator(".scene--ready")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  for (let chapter = 0; chapter < 5; chapter++) {
    await page.evaluate(
      (index) =>
        window.scrollTo({ top: innerHeight * index, behavior: "instant" }),
      chapter,
    );
    await expect(page.locator(".journey-stage")).toHaveAttribute(
      "data-chapter",
      String(chapter),
    );
    await page.waitForTimeout(350);
    await expect(page.locator(".scene--ready")).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("drone controls, project filtering, deep links, and keyboard dialogs work", async ({
  page,
}) => {
  await page.goto("/#physical-ai");
  await expect
    .poll(() =>
      page
        .locator("#physical-ai")
        .evaluate((element) => Math.abs(element.getBoundingClientRect().top)),
    )
    .toBeLessThanOrEqual(3);
  const assemble = page.getByRole("button", { name: "Assemble view" });
  await assemble.click();
  await expect(
    page.getByRole("button", { name: "Explode view" }),
  ).toHaveAttribute("aria-pressed", "false");
  await page.getByRole("button", { name: "Transparent shell" }).click();
  await expect(
    page.getByRole("button", { name: "Transparent shell" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("button", { name: "Read case study: ManySight" })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page).toHaveURL(/project=manysight/);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Read case study: ManySight" }),
  ).toBeFocused();
  await page.getByRole("button", { name: /^Agents/ }).click();
  await expect(page).toHaveURL(/filter=Agents/);
  await expect(page.locator(".project-row")).toHaveCount(3);
  await page.reload();
  await expect(page.getByRole("button", { name: /^Agents/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.goto("/?project=compression");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText(
    "Matthieu Martel, Célia Picard, Abdelmouhaimen Sarhane",
  );
  await expect(
    page.getByRole("link", { name: "Read the paper", exact: true }).first(),
  ).toHaveAttribute("href", "https://doi.org/10.1109/ICT4S64576.2024.00020");
});

test("motion preference persists and WebGL failure preserves useful content", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
  await page.getByRole("button", { name: "Enable animations" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "on");
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type.includes("webgl")) return null;
      return original.call(this, type, ...args);
    };
  });
  await page.reload();
  await expect(page.locator(".scene--fallback")).toBeVisible();
  await page.getByRole("button", { name: "Read case study: Sotiby" }).click();
  await expect(page.getByRole("dialog")).toContainText("Sotiby");
  await page.keyboard.press("Escape");
  const pdf = await page.request.get("/files/Abdelmouhaimen-Sarhane-CV.pdf");
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("pdf");
});

test("mobile navigation and layouts fit small and large screens", async ({
  page,
}) => {
  await page.goto("/");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#about/);
  await page
    .getByRole("button", { name: "Read case study: ManySight" })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const bounds = await dialog.boundingBox();
  expect(bounds.width).toBeLessThanOrEqual(390);
});

test("homepage and project dialog pass WCAG A/AA automated checks", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".scene--ready")).toBeVisible();
  const home = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    home.violations.map((issue) => ({
      id: issue.id,
      nodes: issue.nodes.map((node) => node.target),
    })),
  ).toEqual([]);
  await page
    .getByRole("button", { name: "Read case study: ManySight" })
    .click();
  const modal = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    modal.violations.map((issue) => ({
      id: issue.id,
      nodes: issue.nodes.map((node) => node.target),
    })),
  ).toEqual([]);
});

test("original portfolio and its project and education routes remain available", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/legacy/");
  await expect(page.getByText("LET ME").first()).toBeVisible({
    timeout: 15000,
  });
  await page.goto("/legacy/project");
  await expect(
    page.getByText("Compressed Sensing-Based Smart Camera", { exact: true }),
  ).toBeVisible();
  await page.goto("/legacy/education");
  await expect(
    page.getByText("GET-OMP, CNRS, France", { exact: true }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
