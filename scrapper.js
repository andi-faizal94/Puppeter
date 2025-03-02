// const puppeteer = require("puppeteer");
// const fs = require("fs");
// const https = require("https");

// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//   });
//   const page = await browser.newPage();

//   await page.goto("https://nasional.kompas.com", {
//     waitUntil: "networkidle2",
//   });

//   const elements = await page.$$(".articleItem");

//   const csvHeader = "Title,Date,Image URL\n";
//   let csvData = csvHeader;

//   for (const elm of elements) {
//     try {
//       const title = await elm.$eval("h2.articleTitle", (el) =>
//         el.textContent.trim()
//       );
//       const date = await elm.$eval("div.articlePost-date", (el) =>
//         el.textContent.trim()
//       );

//       const imgSrc = await elm.$eval("div.articleItem-img img", (el) =>
//         el.getAttribute("data-src")
//       );

//       csvData += `"${title}","${date}","${imgSrc}"\n`;

//       console.log({ title, date, imgSrc });
//     } catch (error) {}
//   }

//   const csvFilePath = "./collection/data.csv";
//   fs.writeFileSync(csvFilePath, csvData);

//   // await page.goto("https://nasional.kompas.com/?page=2", {
//   //   waitUntil: "networkidle2",
//   // });

//   // await browser.close();
// })();

const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  const csvHeader = "No,Title,Date,Image URL\n";
  let csvData = csvHeader;
  let rowNumber = 1;

  const scrapePage = async (url) => {
    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    const elements = await page.$$(".articleItem");

    for (const elm of elements) {
      try {
        const title = await elm.$eval("h2.articleTitle", (el) =>
          el.textContent.trim()
        );

        const date = await elm.$eval("div.articlePost-date", (el) =>
          el.textContent.trim()
        );

        const imgSrc = await elm.$eval("div.articleItem-img img", (el) =>
          el.getAttribute("data-src")
        );

        csvData += `"${rowNumber}","${title}","${date}","${imgSrc}"\n`;

        rowNumber++

      } catch (error) {
        console.error("Error scraping element:", error);
      }
    }
  };

  await scrapePage("https://nasional.kompas.com");

  for (let p = 2; p < 10; p++) {
    await scrapePage(`https://nasional.kompas.com/?page=${p}`);
  }

  const csvFilePath = "./collection/data.csv";
  fs.writeFileSync(csvFilePath, csvData);
  console.log("Data export to CSV In Folder",csvFilePath)

  await browser.close();
})();
