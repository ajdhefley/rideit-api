/**
 * Scrapes and saves coaster data from RCDB.
 **/

const mysql     = require('mysql');
const puppeteer = require('puppeteer');
const { executeQuery } = require('../../utilities/db');

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

async function getDetailsImages(driver, link) {
    const urlList = [];
    const picLinks = await driver.evaluate(() => {
        return Object.values(document.querySelectorAll('.pic-strip a'));
    });

    for (let i = 1; i <= Math.min(picLinks.length, 5); i++) {
        await driver.click(`.pic-strip a:nth-child(${i})`);

        const url = await driver.evaluate(() => {
            const bg = window.getComputedStyle(document.body)['background-image'];
            const start = bg.indexOf('url("');
            const end = bg.indexOf('"),');
            const url = bg.substring(start+5, end);
            return url;
        });
        urlList.push(url);

        await driver.goto(link);
    }

    return urlList;
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
        await runDetailsPage(driver, url);
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

        const trainInfoElem = getElementsByXPath('//*[contains(text(), "Riders are arranged")]')[0];
        const trainInfo = trainInfoElem?.innerText;
        const numCars = trainInfo ? trainInfo.split('cars')[0].split(' ').at(-2) : null;
        const singleRow = trainInfo ? trainInfo.split('single row').length > 1 : false;
        const numSeatsPerRow = trainInfo ? trainInfo.split('Riders are arranged')[1].split(' ')[1] : null;
        const numRowsPerCar = trainInfo ? (singleRow ? 1 : trainInfo.split('rows')[0].split(' ').at(-2)) : null;

        let numInsideSeatsPerRow = numSeatsPerRow;
        let numOutsideSeatsPerRow = numSeatsPerRow ? 0 : null;

        if (model === 'Wing Coaster') {
            if (manufacturer === 'Bolliger & Mabillard') {
                numInsideSeatsPerRow = 0;
                numOutsideSeatsPerRow = numSeatsPerRow;
            }
            else if (manufacturer === 'Intamin') {
                numInsideSeatsPerRow = numSeatsPerRow / 2;
                numOutsideSeatsPerRow = numSeatsPerRow / 2;
            }
        }
        
        return { name, park, type, model, manufacturer, length, height, drop, speed, inversions, openingDate, numCars, numRowsPerCar, numInsideSeatsPerRow, numOutsideSeatsPerRow };
    });

    const coasterId = await saveDetails(details);
    const imageUrlList = await getDetailsImages(driver, link);
    imageUrlList.forEach(async (imageUrl) => await saveImageUrl(coasterId, imageUrl));
}

async function clearDetails() {
    await executeQuery(Connection, 'TRUNCATE Coasters');
    await executeQuery(Connection, 'TRUNCATE CoasterImages');
}

async function saveImageUrl(coasterId, imageUrl) {
    const cmd = `
        INSERT INTO CoasterImages (
            CoasterId,
            ImageUrl
        )
        VALUES (
            ${coasterId},
            '${imageUrl}'
        )
    `;

    try {
        console.info(cmd);
        await executeQuery(Connection, cmd);
    }
    catch (err) {
        console.error(err);
    }
}

async function saveDetails(details) {
    const dashify = function(value) {
        return value.toLowerCase()
            .replace(/\./g, '')
            .replace(/\,/g, '')
            .replace(/\&/g, '')
            .replace(/'/g, '')
            .replace(/-/g, '')
            .replace(/   /g, ' ')
            .replace(/  /g, ' ')
            .replace(/ /g, '-');
    };

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
            OpeningDate,
            Url,
            CarsPerTrain,
            RowsPerCar,
            InsideSeatsPerRow,
            OutsideSeatsPerRow
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
            '#ffffff',
            '#000000',
            '${details.openingDate}',
            '${dashify(details.name)}-${dashify(details.park)}',
            ${isNaN(details.numCars) ? null : details.numCars},
            ${isNaN(details.numRowsPerCar) ? null : details.numRowsPerCar},
            ${isNaN(details.numInsideSeatsPerRow) ? null : details.numInsideSeatsPerRow},
            ${isNaN(details.numOutsideSeatsPerRow) ? null : details.numOutsideSeatsPerRow}
        )
    `;

    try {
        console.info(cmd);
        const results = await executeQuery(Connection, cmd);
        return results.insertId;
    }
    catch (err) {
        console.error(err);
    }
}

(async function() {
    Connection.connect();
    await clearDetails();
    await runSync();
    Connection.end();
})();
