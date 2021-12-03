const cors = require('cors');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');


cors({ origin: true });

module.export = class GeeksforGeeks {

    constructor(link) {
        //TODO check validity
        this.link = link;

        this.details = {
            'title': null,
            'decription': null,
            'boilerPlate': ""
        }

    };

    async fetch() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();


        console.log("Fetching", this.link);
        await page.goto(this.link, { waitUntil: 'networkidle0', timeout: 0 });


        const html = await page.content();
        const $ = cheerio.load(html)
        $.html();


        let title = $('span[class=problem-tab__name]').text();
        title = title.trim();

        let descp = $('div .problem-statement').get();
        descp = $.html(descp)

        // const boilerPlateLine = [];
        // $('div .ace-content').each(function (i, elem) {
        //     boilerPlateLine[i] = $(this).text();
        // });

        const boilerPlate = $('div.ace_scroller').text()
        await browser.close();

        const details = {
            'title': title,
            'decription': descp,
            'boilerPlate': boilerPlate
        }

        this.details = details;

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

// const gfg = new GeeksforGeeks('https://practice.geeksforgeeks.org/problems/construct-bst-from-post-order/1/');

// const res = await gfg.fetch();
// console.log(res);