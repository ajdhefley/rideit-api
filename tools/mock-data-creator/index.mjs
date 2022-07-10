/**
 * Inserts fake comments into the DB. The coaster scraper tool should be run first.
 * 
 * Flags:
 *   db-name     = Name of DB being connected to
 *   db-host     = DB host
 *   db-user     = DB user
 *   db-password = DB password
 *   reviews     = Average number of fake reviews to create per coaster
 *   comments    = Average number of comments to create per coaster
 *   reset       = If present, clear the database first, otherwise add tool results to existing data
 *
 * Examples:
 *   node . --db-host=localhost --db-user=root --db-password=password --db-name=MyDatabase --reviews=17 --comments=200 --reset
 **/

import mysql from 'mysql'
import minimist from 'minimist'
import { LoremIpsum } from 'lorem-ipsum'
import { executeQuery, getRandom, promiseMap } from '../toolUtils.mjs'

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

/**
 * Random text generator.
 **/
const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 9,
        min: 2
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
})

async function createMockData() {
    const coasters = await getCoasters()

    return promiseMap(coasters, async (coaster) => {
        const intervalReviews = Args.reviews * 0.20
        const intervalComments = Args.comments * 0.20
        const numReviews = getRandom(Args.reviews - intervalReviews, Args.reviews + intervalReviews)
        const numComments = getRandom(Args.comments - intervalComments, Args.comments + intervalComments)

        for (let i = 1; i <= numReviews; i++) {
            const reviewTitle = lorem.generateWords(getRandom(4, 10))
            const reviewText = lorem.generateParagraphs(getRandom(1, 3))
            const randomRating = getRandom(1, 5)
            await insertReview(coaster.CoasterId, coaster.Name, 1, reviewTitle, reviewText, randomRating)
            await insertReviewTagsForLast()
        }

        for (let i = 1; i <= numComments; i++) {
            const commentText = lorem.generateParagraphs(getRandom(1, 3))
            await insertComment(coaster.CoasterId, coaster.Name, 1, commentText)
        }
    })
}

async function getCoasters() {
    return await executeQuery(Connection, 'SELECT CoasterId, Name FROM Coasters')
}

async function insertComment(coasterId, coasterName, userId, body) {
    console.info(`Inserting comment for ${coasterName}`)

    await executeQuery(Connection, `
        INSERT INTO Comments (CoasterId, UserId, Body)
        VALUES (?, ?, ?)
    `, [coasterId, userId, body])
}

async function insertReview(coasterId, coasterName, userId, title, body, rating) {
    console.info(`Inserting review for ${coasterName} (${rating} / 5):\n"${title}"\n`)

    await executeQuery(Connection, `
        INSERT INTO Reviews (CoasterId, UserId, Title, Body, Rating)
        VALUES (?, ?, ?, ?, ?)
    `, [coasterId, userId, title, body, rating]) 
}

async function insertReviewTagsForLast() {
    const tags = ['Roughness', 'Head Banging', 'Laterals', 'Air Time', 'Low Capacity', 'Head Choppers']

    const randomTag1 = tags[getRandom(0, tags.length-1)]
    const randomTag2 = tags[getRandom(0, tags.length-1)]
    const randomTag3 = tags[getRandom(0, tags.length-1)]

    await executeQuery(Connection, `
        INSERT INTO ReviewTags (ReviewId, Tag)
        VALUES (LAST_INSERT_ID(), ?), (LAST_INSERT_ID(), ?), (LAST_INSERT_ID(), ?)
    `, [randomTag1, randomTag2, randomTag3]) 
}

async function run() {
    Connection.connect()

    if (Args.reset) {
        console.info('Clearing data.')
        await executeQuery(Connection, 'TRUNCATE Reviews')
        await executeQuery(Connection, 'TRUNCATE ReviewTags')
        await executeQuery(Connection, 'TRUNCATE Comments')
    }

    await createMockData()
}

async function dispose() {
    Connection.end()
}

run()
    .then(() => console.info('mock-data-creator finished.'))
    .catch((err) => console.error(err))
    .finally(dispose)