/**
 * Ranks coasters by rating / number of ratings.
 * 
 * Flags:
 *   api-host = URI of the API used for reading/writing data
 *
 * Examples:
 *   node . --api-host=http://127.0.0.1:80
 **/

import axios from 'axios'
import minimist from 'minimist'

/**
 * Allows accessing arguments/flags by name instead of array index.
 **/
const Args = minimist(process.argv.slice(2))

/**
 * API host from args.
 **/
const ApiHost = Args['api-host']

async function rankCoasters() {
    const coasters = await getRankedCoasters()
    for (let i = 0; i < coasters.length; i++) {
        await updateCoasterRank(coasters[i], i+1)
    }
}

async function getRankedCoasters() {
    const result = await SqlClient.query(`
        SELECT
            c.coasterid,
            c.name
        FROM coasters c
        JOIN reviews r ON r.coasterid = c.coasterid
        GROUP BY c.coasterid, c.name
        ORDER BY SUM(r.rating) DESC, COUNT(r.rating) DESC
    `)
    const result = await axios.get(`${ApiHost}/`)
    return result.rows
}

async function updateCoasterRank(coaster, rank) {
    const result = await SqlClient.query(`
        UPDATE coasters
        SET rank = $2
        WHERE coasterid = $1
    `, [coaster.coasterid, rank])
}

async function run() {
    SqlClient.connect()
    await rankCoasters()
}

async function dispose() {
    SqlClient.end()
}

run()
    .then(() => console.info('coaster-ranker finished.'))
    .catch((err) => console.error(err))
    .finally(dispose)
