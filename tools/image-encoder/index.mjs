/**
 * Goes through CoasterImages table and converts image URL into Base64-encoded
 * string, to be used as image preview which loads more quickly in the browser.
 *
 * Example:
 *   node .
 **/

import dotenv from 'dotenv';
import mysql from 'mysql';
import plaiceholder from 'plaiceholder';
import { executeQuery, promiseMap } from '../toolUtils.mjs';

dotenv.config();

/**
 * Tool uses a single open connection.
 **/
const Connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : 'CoasterRanker'
});

async function runImageEncoder() {
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
    return await executeQuery(Connection, 'UPDATE CoasterImages SET Base64=? WHERE CoasterId=? AND ImageUrl=?', [base64, coaster.CoasterId, src]);
}

async function getImagesByCoasterId(coasterId) {
    return await executeQuery(Connection, 'SELECT ImageUrl FROM CoasterImages WHERE CoasterId=? AND Base64 IS NULL', [coasterId]);
}

async function getCoasters() {
    return await executeQuery(Connection, 'SELECT CoasterId, Name FROM Coasters');
}

(async function() {
    Connection.connect();
    await runImageEncoder();
    Connection.end();
})();
