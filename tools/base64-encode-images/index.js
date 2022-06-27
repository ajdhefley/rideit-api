/**
 * Goes through CoasterImages table and converts image URL into Base64 encoded string, to be used as image preview which loads very quickly.
 **/

const mysql = require('mysql');
const plaiceholder = require('plaiceholder');
const { executeQuery } = require('../../utilities/db');
const { promiseMap } = require('../../utilities/promise');

const Connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'ride'
});

async function runEncode() {
    const coasters = await getCoasters();

    return promiseMap(coasters, async (coaster) => {
        const imageResults = await getImagesByCoasterId(coaster.CoasterId);
        return promiseMap(imageResults, async (imageResult) => {
            const result = await plaiceholder.getPlaiceholder(imageResult.ImageUrl);
            await saveImageBase64(coaster, imageResult.ImageUrl, result.base64);
        });
    });
}

async function saveImageBase64(coaster, src, base64) {
    console.info(`Updating ${coaster.Name}: ${src}\n${base64}\n`);
    return await executeQuery(Connection, `UPDATE CoasterImages SET Base64='${base64}' WHERE CoasterId=${coaster.CoasterId} AND ImageUrl='${src}'`);
}

async function getImagesByCoasterId(coasterId) {
    return await executeQuery(Connection, `SELECT ImageUrl FROM CoasterImages WHERE CoasterId=${coasterId}`);
}

async function getCoasters() {
    return await executeQuery(Connection, 'SELECT CoasterId, Name FROM Coasters');
}

(async function() {
    Connection.connect();
    await runEncode();
    Connection.end();
})();
