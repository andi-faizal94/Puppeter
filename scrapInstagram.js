const puppeteer = require("puppeteer");
require("dotenv").config();

async function runBot() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto("https://www.instagram.com/", {
    waitUntil: "networkidle2",
    timeout: 60000,
  });

  await page.waitForSelector("input[type=text]", {
    visible: true,
    timeout: 60000,
  });

  await page.type("input[type=text]", process.env.USERNAME, {
    delay: 150,
  });

  await page.waitForSelector("input[type=password]", {
    visible: true,
    timeout: 60000,
  });

  await page.type("input[type=password]", process.env.PASSWORDIG, {
    delay: 150,
  });

  await page.click('button[type="submit"]');

  // await browser.close();
}

runBot();
