const puppeteer = require("puppeteer");
require("dotenv").config();

async function runBot() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto("https://www.instagram.com/accounts/login/");

  await page.waitForSelector('input[name="username"]', { visible: true });
  await page.$eval(
    "input[name=username]",
    (el) => (el.value = process.env.USERNAME)
  );
  await page.waitForSelector('input[name="password"]', { visible: true });

  await page.$eval(
    "input[name=password]",
    (el) => (el.value = process.env.USERNAME)
  );

  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  await browser.close();
}

runBot();
