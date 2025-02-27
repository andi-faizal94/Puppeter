require("dotenv").config();
const puppeteer = require("puppeteer");

const password = process.env.PASSWORD;

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://x.com/i/flow/login", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    await page.waitForSelector('input[autocomplete="username"]', {
      visible: true,
      timeout: 60000,
    });
    await page.type('input[autocomplete="username"]', process.env.EMAIL, {
      delay: 150,
    });

    await page.keyboard.press("Enter");

    // await page.waitForSelector('input[autocomplete="on"]', {
    //   visible: true,
    //   timeout: 60000,
    // });
    // await page.type('input[autocomplete="on"]', "your_username_account", {
    //   delay: 150,
    // });

    // await page.keyboard.press("Enter");

    await page.waitForSelector('input[autocomplete="current-password"]', {
      visible: true,
      timeout: 60000,
    });

    await page.type('input[autocomplete="current-password"]', password, {
      delay: 100,
    });

    await page.keyboard.press("Enter");

    await browser.close();
  } catch (error) {
    console.error("An error occurred:", error);

    await page.screenshot({ path: "/images/error.png" });
  }
})();
