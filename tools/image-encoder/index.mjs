/**
 * Goes through CoasterImages table and converts image URL into Base64-encoded
 * string, to be used as image preview which loads more quickly in the browser.
 * The coaster scraper tool should be run first.
 *
 * Flags:
 *   db-name     = Name of DB being connected to
 *   db-host     = DB host
 *   db-user     = DB user
 *   db-password = DB password
 * 
 * Example:
 *   node . --db-host=localhost --db-user=root --db-password=password --db-name=MyDatabase
 **/

import mysql from 'mysql'
import plaiceholder from 'plaiceholder'
import minimist from 'minimist'
import { executeQuery, promiseMap } from '../toolUtils.mjs'

/**
 * Allows accessing arguments/flags by name instead of array index.
 **/
const Args = minimist(process.argv.slice(2))

/**
 * Tool uses a single open connection.
 **/
const Connection = mysql.createConnection({
    host     : Args['db-host'],
    user     : Args['db-user'],
    password : Args['db-password'],
    database : Args['db-name']
})

async function encodeAllImages() {
    const coasters = await getCoasters()
    return promiseMap(coasters, async (coaster) => {
        const images = await getImagesByCoasterId(coaster.CoasterId)
        return promiseMap(images, async (image) => {
            const result = await plaiceholder.getPlaiceholder(image.ImageUrl)
            await saveEncodedImage(coaster, image.ImageUrl, result.base64)
        })
    })
}

async function saveEncodedImage(coaster, src, base64) {
    console.info(`Updating ${coaster.Name}: ${src}\n${base64}\n`)
    return await executeQuery(Connection, 'UPDATE CoasterImages SET Base64=? WHERE CoasterId=? AND ImageUrl=?', [base64, coaster.CoasterId, src])
}

async function getImagesByCoasterId(coasterId) {
    return await executeQuery(Connection, 'SELECT ImageUrl FROM CoasterImages WHERE CoasterId=? AND Base64 IS NULL', [coasterId])
}

async function getCoasters() {
    return await executeQuery(Connection, 'SELECT CoasterId, Name FROM Coasters')
}

async function run() {
    Connection.connect()
    await encodeAllImages()
}

async function dispose() {
    Connection.end()
}

run()
    .then(() => console.info('image-encoder finished.'))
    .catch((err) => console.error(err))
    .finally(dispose)
