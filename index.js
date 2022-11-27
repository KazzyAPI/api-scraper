const scrapeApi = require('./Scraper/index.js');
const {link, timeout} = require("./Configuration/config.json")


scrapeApi(link, timeout * 1000);