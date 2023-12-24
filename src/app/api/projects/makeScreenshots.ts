import { cache } from "react";
import { BrowserSize } from "@/enums/browserSizes";
import puppeteer, { KnownDevices, Page } from "puppeteer";

export const revalidate = 3600;

export const makeScreenshots = cache(async (url: string, projectId: string) => {
  const browser = await puppeteer.launch({ headless: true });
  url = "https://" + url;

  const screenshotPromises = [];

  const makeLightModeScreenshots = async (page: Page, browserSize: string) => {
    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: "light" },
    ]);
    await page.goto(url);
    await page.waitForNavigation({ waitUntil: "networkidle0" });
    await page.screenshot({
      path: `./public/screenshots/${projectId}_light_${browserSize}.png`,
    });
  };

  const makeDarkModeScreenshots = async (page: Page, browserSize: string) => {
    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: "dark" },
    ]);
    await page.goto(url);
    await page.waitForNavigation({ waitUntil: "networkidle0" });
    await page.screenshot({
      path: `./public/screenshots/${projectId}_dark_${browserSize}.png`,
    });
  };

  // Make screenshot of Desktop
  screenshotPromises.push(
    (async () => {
      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });
      await makeLightModeScreenshots(page, "desktop");
      await makeDarkModeScreenshots(page, "desktop");
      await page.close();
    })()
  );

  // Make screenshot of Tablet
  screenshotPromises.push(
    (async () => {
      const page = await browser.newPage();
      await page.emulate(KnownDevices[BrowserSize.Tablet]);
      await makeLightModeScreenshots(page, "tablet");
      await makeDarkModeScreenshots(page, "tablet");
      await page.close();
    })()
  );

  // Make screenshot of Mobile
  screenshotPromises.push(
    (async () => {
      const page = await browser.newPage();
      await page.emulate(KnownDevices[BrowserSize.Mobile]);
      await makeLightModeScreenshots(page, "mobile");
      await makeDarkModeScreenshots(page, "mobile");
      await page.close();
    })()
  );

  await Promise.all(screenshotPromises);

  await browser.close();

  return {
    dark: {
      desktop: `/screenshots/${projectId}_dark_desktop.png`,
      tablet: `/screenshots/${projectId}_dark_tablet.png`,
      mobile: `/screenshots/${projectId}_dark_mobile.png`,
    },
    light: {
      desktop: `/screenshots/${projectId}_light_desktop.png`,
      tablet: `/screenshots/${projectId}_light_tablet.png`,
      mobile: `/screenshots/${projectId}_light_mobile.png`,
    },
  };
});
