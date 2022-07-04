/**
 * Inserts fake comments into the DB. The coaster scraper tool should be run first.
 * 
 * Examples:
 *   node .
 **/

import mysql from 'mysql';
import dotenv from 'dotenv';
import { executeQuery } from '../toolUtils.mjs';
 
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

async function runMockDataCreator() {

}

async function getCoasters() {
    return await executeQuery(Connection, 'SELECT CoasterId, Name FROM Coasters');
}

(async function() {
    Connection.connect();
    await runMockDataCreator();
    Connection.end();
})();
 