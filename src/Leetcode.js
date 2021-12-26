import cors from 'cors';
import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio';

cors({ origin: true });

export default class LeetCode {

    constructor(link) {
        //TODO check validity
        this.link = link;



    }

    async fetch() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();


        console.log("Fetching", this.link);
        await page.goto(this.link, { waitUntil: 'networkidle0' });


        const html = await page.content();
        const $ = cheerio.load(html)
        $.html();


        const title = $('div[data-cy=question-title]').text();
        const descp = $('div[class^=content]').get();
        console.log(descp);

        // let re = new RegExp('')
        // let texts = $('div.content*').map((i, a) => $(a).text())
        // let description = texts.filter(text => text.match(re))

        await browser.close();

        return descp;
    }

    getDetails() {

    }


}

const lc = new LeetCode('https://leetcode.com/problems/two-sum/');
await lc.fetch();