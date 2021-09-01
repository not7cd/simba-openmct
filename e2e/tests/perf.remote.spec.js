const pw = require('playwright');

(async () => {

    const browser = await pw.chromium.connectOverCDP({
        endpointURL: 'wss://chrome.browserless.io/token=',
        headers: {
            'Authorization': 'Basic ss'
        }
    });

    const page = await browser.newPage();

    try {
        await page.goto('https://browserless.io', { waitUntil: 'networkidle' });
        await page.screenshot({ path: './browserless.png' });
        browser.close();
    } catch (error) {
        console.error({ error }, 'Something happened!');
        browser.close();
    }
})();
