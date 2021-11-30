import cors from 'cors';
import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio';
import fs from 'fs'

cors({ origin: true });

export default class LeetCode {

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
            'decription': descp
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
        this.details.decription;
    }

}

