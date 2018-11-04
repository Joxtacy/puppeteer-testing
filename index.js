//const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    // await page.goto('https://carmalou.com');
    // networkidle2: wait for there to not be 2 network requests within 500 ms.
    await page.goto('https://branas.se', { waitUntil: 'networkidle2' });
    await page.waitForSelector('#tvx-customer-widget-button', { timeout: 5000 });
    await page.click('#tvx-customer-widget-button');

    // can also set markup directly
    // const html = "<h1>Hello OKC.js! Isn't Puppeteer magical?</h1>";
    // await page.setContent(html);

    // get the source code (this is what we're waiting for)
    // const html = await page.content();
    // save it to a file?

    // take a screenshot
    await page.screenshot({ path: 'screenshot.png', fullPage: true });

    // generate a pdf
    // await page.pdf({
    //     path: 'mypdf.pdf',
    //     format: 'Letter',
    //     margin: {
    //         top: '1in',
    //         bottom: '1in',
    //         left: '1in',
    //         right: '1in'
    //     }
    // });

    // close the browser
    await browser.close();
})();

// page.waitForSelector: waits for the selector to appear in page
// page.evaluate: accepts a func parameter in the page context
// page.focus: accepts a selector and focuses on it
// page.keyboard.type: simulates keypresses and inputs text
// page.click: accepts a selector and clicks on it
// page.waitFor: accepts a func which can prolong wait, if func returns true, program resumes

