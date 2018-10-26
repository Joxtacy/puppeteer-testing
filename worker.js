const { parentPort, workerData } = require('worker_threads');
const puppeteer = require('puppeteer');

parentPort.on('message', (e) => {
    (async () => {
        const start = Date.now()

        const links = e;

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await (async (links) => {
            for (let i = 0; i < links.length; i++) {
                try {
                    console.log('Worker ' + workerData + ' looking at:', links[i]);
                    await page.goto(links[i], { waitUntil: 'networkidle2' });
                    console.log('Worker ' + workerData + ' done with link');
                } catch (error) {
                    console.error('Worker ' + workerData + ' encountered a problem');
                }
            }
        })(links);

        await browser.close();
        parentPort.postMessage({ time: Date.now() - start, msg: 'I am done!' });
        parentPort.close();
    })();
});
