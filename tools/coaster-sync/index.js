/**
 * Scrapes and saves coaster data from RCDB.
 **/

const mysql     = require('mysql');
const puppeteer = require('puppeteer');

const BaseUrl = 'https://rcdb.com/r.htm?ex=on&st=93&ol=1&ot=2&cs=277';
const Connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'ride'
});

async function runSync() {
    const browser = await puppeteer.launch({ headless: false });
    const driver = await browser.newPage();

    await driver.goto(BaseUrl);

    const totalPages = await driver.evaluate(() => {
        const lastPageLink = document.querySelector('#rfoot a:nth-last-child(2)');
        return lastPageLink.innerText;
    });

    for (let i = 1; i <= totalPages; i++) {
        await runSearchResultsPage(driver, i);
    }

    browser.close();
}

async function runSearchResultsPage(driver, pageNum) {
    await driver.goto(`${BaseUrl}&page=${pageNum}`);

    const urlList = await driver.evaluate(() => {
        const links = document.querySelectorAll('.stdtbl tbody tr td:nth-child(2) a');
        const urls = Array.from(links).map(e => e.href);
        return urls;
    });

    for (let url of urlList) {
        await driver.waitForTimeout(100);
        const coasterDetails = await runDetailsPage(driver, url);
        await saveDetails(coasterDetails);
        console.log(coasterDetails);
    }
}

async function runDetailsPage(driver, link) {
    await driver.goto(link);

    const details = await driver.evaluate(() => {
        function getElementsByXPath(xpath, parent) {
            let results = [];
            let query = document.evaluate(xpath, parent || document,
                null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (let i = 0, length = query.snapshotLength; i < length; ++i) {
                results.push(query.snapshotItem(i));
            }
            return results;
        }

        const nameElem = document.querySelector('#feature > div:nth-child(1) > h1');
        const name = nameElem?.innerText;

        const parkElem = document.querySelector('#feature > div:nth-child(1) > a:nth-child(2)');
        const park = parkElem?.innerText;

        const typeElem = document.querySelector('#feature > ul:nth-child(3) > li:nth-child(2) > a');
        const type = typeElem?.innerText;

        const modelElem = document.querySelector('#feature > div.scroll > p > a:nth-child(3)');
        const model = modelElem?.innerText || null;

        const manufacturerElem = document.querySelector('#feature > div.scroll > p > a:nth-child(1)');
        const manufacturer = manufacturerElem?.innerText;

        const lengthElem = getElementsByXPath('//th[contains(text(), "Length")]/following-sibling::td[1]/span');
        const length = lengthElem[0] ? lengthElem[0].innerText.replace(/,/g, '') : null;

        const heightElem = getElementsByXPath('//th[contains(text(), "Height")]/following-sibling::td[1]/span');
        const height = heightElem[0] ? heightElem[0].innerText.replace(/,/g, '') : null;

        const dropElem = getElementsByXPath('//th[contains(text(), "Drop")]/following-sibling::td[1]/span');
        const drop = dropElem[0] ? dropElem[0].innerText.replace(/,/g, '') : null;

        const speedElem = getElementsByXPath('//th[contains(text(), "Speed")]/following-sibling::td[1]/span');
        const speed = speedElem[0] ? speedElem[0].innerText.replace(/,/g, '') : null;

        const inversionsElem = getElementsByXPath('//th[contains(text(), "Inversions")]/following-sibling::td[1]');
        const inversions = inversionsElem[0] ? inversionsElem[0].innerText.replace(/,/g, '') : null;

        const openingDateElem = document.querySelector('#feature > p > time');
        const openingDate = openingDateElem?.innerText; 

        return { name, park, type, model, manufacturer, length, height, drop, speed, inversions, openingDate };
    });

    return details;
}

async function clearDetails() {
    const cmd = 'TRUNCATE Coasters';

    Connection.query(cmd, (error, results, fields) => {
        if (error) throw error;
    });
}

async function saveDetails(details) {
    const cmd = `
        INSERT INTO Coasters (
            Park,
            Name,
            Type,
            Model,
            Manufacturer,
            LengthInFt,
            HeightInFt,
            DropInFt,
            SpeedInMph,
            Inversions,
            ColorPrimary,
            ColorSecondary,
            OpeningDate
        )
        VALUES (
            ${details.park ? JSON.stringify(details.park) : 'NULL'},
            ${details.name ? JSON.stringify(details.name) : 'NULL'},
            ${details.type ? JSON.stringify(details.type) : 'NULL'},
            ${details.model ? JSON.stringify(details.model) : 'NULL'},
            ${details.manufacturer ? JSON.stringify(details.manufacturer) : 'NULL'},
            ${details.length || 'NULL'},
            ${details.height || 'NULL'},
            ${details.drop || 'NULL'},
            ${details.speed || 'NULL'},
            ${details.inversions || 0},
            '#000000',
            '#ffffff',
            '${details.openingDate}'
        )
    `;

    console.log(cmd);

    Connection.query(cmd, (error, results, fields) => {
        if (error) throw error;
    });
}

(async function() {
    Connection.connect();
    await clearDetails();
    await runSync();
    Connection.end();
})();
