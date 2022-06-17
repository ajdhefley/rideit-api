/**
 * Goes through CoasterImages table and converts image URL into Base64 encoded string.
 **/

const mysql = require('mysql');
const plaiceholder = require('plaiceholder');

const Connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'ride'
});

function promiseMap(array, func) {
    let promiseArray = array.map((item) => new Promise(async (resolve, reject) => {
        try {
            const result = await func(item);
            resolve(result);
        }
        catch (err) {
            reject(err);
        }
    }));

    return Promise.all(promiseArray);
}

async function runEncode() {
    const coasters = await getCoasters();

    return promiseMap(coasters, async (coaster) => {
        const imageResults = await getImagesByCoasterId(coaster.CoasterId);
        return promiseMap(imageResults, async (imageResult) => {
            const base64 = await plaiceholder.getPlaiceholder(imageResult.ImageUrl);
            await saveImageBase64(coaster, imageResult.ImageUrl, base64);
        });
    });
}

async function saveImageBase64(coaster, src, base64) {
    return new Promise((resolve, reject) => {
        const cmd = `
            UPDATE CoasterImages
            SET Base64='${base64}'
            WHERE CoasterId=${coaster.CoasterId} AND ImageUrl='${src}'
        `;

        console.info(`Updating ${coaster.Name}: ${src}`);

        Connection.query(cmd, (error, results, fields) => {
            if (error) reject(error);
            else resolve();
        });
    });
}

async function getImagesByCoasterId(coasterId) {
    return new Promise((resolve, reject) => {
        const cmd = `
            SELECT ImageUrl
            FROM CoasterImages
            WHERE CoasterId=${coasterId}
        `;

        Connection.query(cmd, (error, results, fields) => {
            if (error) reject(error);
            else resolve(Array.from(results));
        });
    });
}

async function getCoasters() {
    return new Promise((resolve, reject) => {
        const cmd = `
            SELECT
                CoasterId,
                Name
            FROM Coasters
        `;

        Connection.query(cmd, (error, results, fields) => {
            if (error) reject(error);
            else resolve(Array.from(results));
        });
    });
}

(async function() {
    Connection.connect();
    await runEncode();
    Connection.end();
})();
