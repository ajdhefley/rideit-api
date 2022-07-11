/**
 * Inserts fake reviews/comments into the DB for performance/UI testing.
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

import postgres from 'pg'
import minimist from 'minimist'
import { LoremIpsum } from 'lorem-ipsum'
import { getRandom, promiseMap } from '../toolUtils.mjs'

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
            const randomRating = getRandom(1, 5)
            const reviewTitle = lorem.generateWords(getRandom(4, 10))
            const reviewText = await generateReviewText(coaster.name)
            const review = await insertReview(coaster.coasterid, coaster.name, 1, reviewTitle, reviewText, randomRating)
            await insertReviewTags(review.reviewid)
        }

        for (let i = 1; i <= numComments; i++) {
            const commentText = lorem.generateParagraphs(getRandom(1, 3))
            await insertComment(coaster.coasterid, coaster.name, 1, commentText)
        }
    })
}

async function getCoasters() {
    const result = await SqlClient.query('SELECT CoasterId, Name FROM Coasters')
    return result.rows
}

async function insertComment(coasterId, coasterName, userId, body) {
    console.info(`Inserting comment for ${coasterName}`)

    await SqlClient.query(`
        INSERT INTO Comments (CoasterId, UserId, Body)
        VALUES ($1, $2, $3)
    `, [coasterId, userId, body])
}

async function insertReview(coasterId, coasterName, userId, title, body, rating) {
    console.info(`Inserting review for ${coasterName} (${rating} / 5):\n"${title}"\n`)

    const result = await SqlClient.query(`
        INSERT INTO Reviews (CoasterId, UserId, Title, Body, Rating)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `, [coasterId, userId, title, body, rating])
    return result.rows[0]
}

async function insertReviewTags(reviewId) {
    const tags = ['Roughness', 'Head Banging', 'Laterals', 'Air Time', 'Low Capacity', 'Head Choppers']

    const randomTag1 = tags[getRandom(0, tags.length-1)]
    const randomTag2 = tags[getRandom(0, tags.length-1)]
    const randomTag3 = tags[getRandom(0, tags.length-1)]

    await SqlClient.query(`
        INSERT INTO ReviewTags (ReviewId, Tag)
        VALUES ($4, $1), ($4, $2), ($4, $3)
    `, [randomTag1, randomTag2, randomTag3, reviewId]) 
}

async function generateReviewText(coasterName) {
    const text = lorem.generateParagraphs(getRandom(1, 3))
    const textSplit = text.split(' ')
    
    for (let i = 1; i <= getRandom(5, 15); i++) {
        // Randomly replace words with coaster name for relevance.
        textSplit[getRandom(0, textSplit.length-1)] = coasterName
    }

    return textSplit.join(' ')
}

async function run() {
    SqlClient.connect()

    if (Args.reset) {
        console.info('Clearing data.')
        await SqlClient.query('TRUNCATE Reviews')
        await SqlClient.query('TRUNCATE ReviewTags')
        await SqlClient.query('TRUNCATE Comments')
    }

    await createMockData()
}

async function dispose() {
    SqlClient.end()
}

run()
    .then(() => console.info('mock-data-creator finished.'))
    .catch((err) => console.error(err))
    .finally(dispose)