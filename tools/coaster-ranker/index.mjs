/**
 * Ranks coasters by rating / number of ratings.
 * 
 * Flags:
 *   db-name     = Name of DB being connected to
 *   db-host     = DB host
 *   db-user     = DB user
 *   db-password = DB password
 *
 * Examples:
 *   node . --db-host=localhost --db-user=root --db-password=password --db-name=MyDatabase
 **/

import postgres from 'pg'
import minimist from 'minimist'

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
