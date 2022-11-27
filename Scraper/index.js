const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const { executablePath } = require("puppeteer");
const { Util } = require("../Utils/index");
const fs = require("fs");

const { logger } = require("../Libs/index");

async function scrapeApi(uri, timeout) {
  arr = [];
  try {
    logger.debug("Starting browser...");
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: executablePath(),
    });
    logger.debug("Browser launched");
    const page = await browser.newPage();
    logger.debug("New page opened");
    await page.goto(uri);
    await page.setRequestInterception(true);
    logger.debug("Request interception enabled");
    logger.debug("Waiting for response...");
    logger.debug(`Listening for ${timeout / 1000} seconds...`);
    page.on("request", (request) => {
      let string = request.url();
      if (string.includes("api")) {
        logger.info(string);
        arr.push(string);
      }
    });
    setTimeout(async () => {
      logger.debug("Closing browser...");

      await browser.close();
      logger.debug("Browser closed");
      logger.debug("Writing to file...");
      let date = new Date().toTimeString().split(" ")[0];

      fs.writeFileSync(
        `../Results/${date}.txt`,
        arr.join(","),
        "utf8",
        (err) => {
          if (err) return console.error(err.message);
          logger.debug("File written");
        }
      );
    }, timeout);
  } catch (error) {
    logger.error(error);
  }
}

module.exports = scrapeApi;
