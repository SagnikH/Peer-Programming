const cors = require('cors');
const puppeteer = require('puppeteer')
const cheerio = require('cheerio');
const setImage = require('./setImage.js');

cors({ origin: true });

class LeetCode {

    constructor(link) {
        //TODO check validity
        this.link = link;

        this.details = {
            'title': null,
            'decription': null
        }

    };

    async fetch() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();


        console.log("Fetching", this.link);
        await page.goto(this.link, { waitUntil: 'networkidle0' });


        const html = await page.content();
        const $ = cheerio.load(html)
        $.html();


        const title = $('div[data-cy=question-title]').text();
        let descp = $('div .question-content__JfgR').get();
        descp = $.html(descp)

        // console.log($.html(descp));

        await browser.close();

        const details = {
            'title': title,
            'description': descp
        }

        this.details = details

        return details;
    }

    getDetails() {
        return this.details;
    }

    getTitle() {
        this.details.title;
    }

    getDescription() {
        this.details.description;
    }

}

const lc = new LeetCode('https://leetcode.com/problems/recover-binary-search-tree/');
const dummy = async () => {
    const res = await lc.fetch();
    //console.log(res);
    const temp = setImage(res.description);
    console.log(temp);
    const leetcodeJSX = {...res, description: temp};
    //console.log(leetcodeJSX);
}

dummy();
//module.exports = Leetcode;