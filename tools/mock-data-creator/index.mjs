/**
 * Inserts fake comments into the DB. The coaster scraper tool should be run first.
 * 
 * Examples:
 *   node .
 **/

import mysql from 'mysql'

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

async function run() {
    Connection.connect()
}

async function dispose() {
    Connection.end()
}

run()
    .then(() => console.info('mock-data-creator finished.'))
    .catch((err) => console.error(err))
    .finally(dispose)