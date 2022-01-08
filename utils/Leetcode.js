const cors = require("cors");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const setImage = require("./setImage");
const axios = require("axios");

cors({ origin: true });

const editTitle = (title) => {
	title = title.trim();
	let idx = title.indexOf(".");
	title = title.substring(idx + 2, title.length);
};

class LeetCode {
	constructor(link) {
		//TODO check validity
		const pos = this.getPosition(link, "/", 5);
		if (pos != -1) link = link.substring(0, pos);
		this.link = link;

		this.details = {
			title: null,
			description: null,
			boilerPlate: "",
		};
	}

	async fetch() {
		const isValid = await this.validate(this.link);
		if (!isValid) return null;

		//console.log("launching puppeteer");
		const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
		const page = await browser.newPage();
		//console.log("launched puppeteer");

		//console.log("Fetching", this.link);
		try {
			await page.goto(this.link, { waitUntil: "networkidle0", timeout: 0 });
		} catch (e) {
			return null;
		}

		const html = await page.content();
		//console.log("fetched, scrapping");
		const $ = cheerio.load(html);
		$.html();

		let title = $("div[data-cy=question-title]").text();
		title = title.trim();
		let idx = title.indexOf(".");
		title = title.substring(idx + 2, title.length);
		//console.log("title scrapped", title);

		let descp = $("div .question-content__JfgR").get();
		descp = $.html(descp);
		//console.log("description scrapped");

		const boilerPlateLine = [];
		$("span[role=presentation]").each(function (i, elem) {
			boilerPlateLine[i] = $(this).text();
		});

		await browser.close();
		//console.log("puppetter closed");

		const details = {
			title: title,
			description: descp,
			boilerPlate: boilerPlateLine.join("\n"),
		};

		this.details = details;
		// //console.log(details);

		return details;
	}

	async validate(link) {
		const re = new RegExp("^https://leetcode.com/problems/.+");

		if (!re.test(link)) return false;

		try {
			const res = await axios.head(link);
			//console.log(res.status);
			if (res.status != 200) return false;
		} catch (e) {
			return false;
		}

		return true;
	}

	getDetails() {
		return this.details;
	}

	getTitle() {
		return this.details.title;
	}

	getQuestion() {
		return setImage(this.details.description);
	}

	getPosition(string, subString, index) {
		return string.split(subString, index).join(subString).length;
	}
}

module.exports = LeetCode;

// const lc = new LeetCode('https://leetcode.com/problems/balance-a-binary-search-tree/');

// const res = await lc.fetch();
// //console.log(res);
// const temp = setImage(res.description);
// const leetcodeJSX = {...res, description: temp};
// //console.log(leetcodeJSX);
