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

import postgres from 'pg'
import plaiceholder from 'plaiceholder'
import minimist from 'minimist'
import { promiseMap } from '../toolUtils.mjs'

/**
 * Allows accessing arguments/flags by name instead of array index.
 **/
const Args = minimist(process.argv.slice(2))

/**
 * Tool uses a single open connection.
 **/
const { Client } = postgres
const SqlClient = new Client({
    host     : Args['db-host'],
    database : Args['db-name'],
    user     : Args['db-user'],
    password : Args['db-password']
})

async function encodeAllImages() {
    const coasters = await getCoasters()
    return promiseMap(coasters, async (coaster) => {
        const images = await getImagesByCoasterId(coaster.coasterid)
        return promiseMap(images, async (image) => {
            const result = await plaiceholder.getPlaiceholder(image.imageurl)
            await saveEncodedImage(coaster, image.imageurl, result.base64)
        })
    })
}

async function saveEncodedImage(coaster, src, base64) {
    console.info(`Updating ${coaster.name}: ${src}\n${base64}\n`)
    const result = await SqlClient.query('UPDATE CoasterImages SET Base64=$1 WHERE CoasterId=$2 AND ImageUrl=$3', [base64, coaster.CoasterId, src])
    return result.rows
}

async function getImagesByCoasterId(coasterId) {
    const result = await SqlClient.query('SELECT ImageUrl FROM CoasterImages WHERE CoasterId=$1 AND Base64 IS NULL', [coasterId])
    return result.rows
}

async function getCoasters() {
    const result = await SqlClient.query('SELECT CoasterId, Name FROM Coasters')
    return result.rows
}

async function run() {
    SqlClient.connect()
    await encodeAllImages()
}

async function dispose() {
    SqlClient.end()
}

run()
    .then(() => console.info('image-encoder finished.'))
    .catch((err) => console.error(err))
    .finally(dispose)
