/**
 * Searches RCDB for all coasters in North America. Scrapes data and up to
 * a maximum number of images by accessing details for each search result.
 * 
 * Also makes some calculations upon saving (such as 4 outside seats / 0 inside seats for Manufacturer=B&M, Model=Wing.)
 * 
 * Flags:
 *   db-name     = Name of DB being connected to
 *   db-host     = DB host
 *   db-user     = DB user
 *   db-password = DB password
 *   page        = Which page to start on (say if previous run stopped prematurely and need to start tool later in the process)
 *   reset       = If present, clear the database first, otherwise add tool results to existing data
 *  
 *
 * Examples:
 *   node . --db-host=localhost --db-user=root --db-password=password --db-name=MyDatabase
 *   node . --db-host=localhost --db-user=root --db-password=password --db-name=MyDatabase --page=10
 *   node . --db-host=localhost --db-user=root --db-password=password --db-name=MyDatabase --page=15 --reset
 **/

import postgres from 'pg'
import puppeteer from 'puppeteer'
import minimist from 'minimist'
import { getElementsByXPath } from '../toolUtils.mjs'

/**
 * Allows accessing arguments/flags by name instead of array index.
 **/
const Args = minimist(process.argv.slice(2))

/**
 * Executes search with the following filters:
 *   Existing       = true
 *   Status         = Operating
 *   Location       = North America
 *   Type           = All (Steel & Wood)
 *   Classification = Roller Coaster
 **/
const BaseUrl = 'https://rcdb.com/r.htm?ex=on&st=93&ol=1&ot=2&cs=277'

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
 * Used for accessing and controlling the DOM to bring up pages with data/images.
 **/
let Browser = {}
let Driver = {}

async function scrapeSearchResults() {
    await Driver.goto(BaseUrl)
    await Driver.exposeFunction('getElementsByXPath', getElementsByXPath)

    const totalPages = await Driver.evaluate(() => {
        const lastPageLink = document.querySelector('#rfoot a:nth-last-child(2)')
        return lastPageLink.innerText
    })

    for (let i = 1; i <= totalPages; i++) {
        if (Args.page && i < Args.page)
            continue
            
        await Driver.goto(`${BaseUrl}&page=${i}`)

        const pageUrlList = await Driver.evaluate(() => {
            const links = document.querySelectorAll('.stdtbl tbody tr td:nth-child(2) a')
            const urls = Array.from(links).map(e => e.href)
            return urls
        })

        for (let url of pageUrlList) {
            const details = await scrapeDetails(url)
            const imageUrlList = await scrapeImages(url)
            await saveToDb(details, imageUrlList)
        }
    }
}

async function scrapeDetails(link) {
    await Driver.goto(link)

    return await Driver.evaluate(() => {
        const nameElem = document.querySelector('#feature > div:nth-child(1) > h1')
        const name = nameElem?.innerText

        const parkElem = document.querySelector('#feature > div:nth-child(1) > a:nth-child(2)')
        const park = parkElem?.innerText

        const uniqueUrl = `${name}@${park}`
            .toLowerCase()
            .replace(/\./g, '')
            .replace(/\,/g, '')
            .replace(/\&/g, '')
            .replace(/'/g, '')
            .replace(/-/g, '')
            .replace(/   /g, ' ')
            .replace(/  /g, ' ')
            .replace(/ /g, '-')
            .replace(/@/g, '-')

        const typeElem = document.querySelector('#feature > ul:nth-child(3) > li:nth-child(2) > a')
        const type = typeElem?.innerText

        const modelElem = document.querySelector('#feature > div.scroll > p > a:nth-child(3)')
        const model = modelElem?.innerText || null

        const manufacturerElem = document.querySelector('#feature > div.scroll > p > a:nth-child(1)')
        const manufacturer = manufacturerElem?.innerText

        const lengthElem = getElementsByXPath('//th[contains(text(), "Length")]/following-sibling::td[1]/span', document)
        const length = lengthElem[0] ? lengthElem[0].innerText.replace(/,/g, '') : null

        const heightElem = getElementsByXPath('//th[contains(text(), "Height")]/following-sibling::td[1]/span', document)
        const height = heightElem[0] ? heightElem[0].innerText.replace(/,/g, '') : null

        const dropElem = getElementsByXPath('//th[contains(text(), "Drop")]/following-sibling::td[1]/span', document)
        const drop = dropElem[0] ? dropElem[0].innerText.replace(/,/g, '') : null

        const speedElem = getElementsByXPath('//th[contains(text(), "Speed")]/following-sibling::td[1]/span', document)
        const speed = speedElem[0] ? speedElem[0].innerText.replace(/,/g, '') : null

        const inversionsElem = getElementsByXPath('//th[contains(text(), "Inversions")]/following-sibling::td[1]', document)
        const inversions = inversionsElem[0] ? inversionsElem[0].innerText.replace(/,/g, '') : null

        const openingDateElem = document.querySelector('#feature > p > time')
        const openingDate = openingDateElem?.innerText

        const trainInfoElem = getElementsByXPath('//*[contains(text(), "Riders are arranged")]', document)[0]
        const trainInfo = trainInfoElem?.innerText
        const numCars = trainInfo ? trainInfo.split('cars')[0].split(' ').at(-2) : null
        const singleRow = trainInfo ? trainInfo.split('single row').length > 1 : false
        const numSeatsPerRow = trainInfo ? trainInfo.split('Riders are arranged')[1].split(' ')[1] : null
        const numRowsPerCar = trainInfo ? (singleRow ? 1 : trainInfo.split('rows')[0].split(' ').at(-2)) : null

        let numInsideSeatsPerRow = numSeatsPerRow
        let numOutsideSeatsPerRow = numSeatsPerRow ? 0 : null

        if (model === 'Wing Coaster') {
            if (manufacturer === 'Bolliger & Mabillard') {
                numInsideSeatsPerRow = 0
                numOutsideSeatsPerRow = numSeatsPerRow
            }
            else if (manufacturer === 'Intamin') {
                numInsideSeatsPerRow = numSeatsPerRow / 2
                numOutsideSeatsPerRow = numSeatsPerRow / 2
            }
        }
        
        return { name, park, uniqueUrl, type, model, manufacturer, length, height, drop, speed, inversions, openingDate, numCars, numRowsPerCar, numInsideSeatsPerRow, numOutsideSeatsPerRow }
    })
}

async function scrapeImages(link) {
    const picLinks = await Driver.evaluate(async () => {
        // Take a maximum of five images.
        return Object.values(document.querySelectorAll('.pic-strip a')).slice(0, 5)
    })
    const urlList = []

    for (let i = 1; i <= picLinks.length; i++) {
        await Driver.click(`.pic-strip a:nth-child(${i})`)

        const url = await Driver.evaluate(() => {
            const bg = window.getComputedStyle(document.body)['background-image']
            const start = bg.indexOf('url("')
            const end = bg.indexOf('"),')
            return bg.substring(start+5, end)
        })
        urlList.push(url)

        await Driver.goto(link)
    }

    return urlList
}

async function saveToDb(details, imageUrls) {
    const coasterCmd = `
        INSERT INTO Coasters (
            Name,
            Park,
            Url,
            Type,
            Model,
            Manufacturer,
            LengthInFt,
            HeightInFt,
            DropInFt,
            SpeedInMph,
            Inversions,
            OpeningDate,
            CarsPerTrain,
            RowsPerCar,
            InsideSeatsPerRow,
            OutsideSeatsPerRow
        )
        VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9,
            $10, $11, $12, $13, $14, $15, $16
        )
        RETURNING *
    `
    const imageCmd = `
        INSERT INTO CoasterImages (CoasterId, ImageUrl) VALUES ($1, $2)
    `

    try {
        const coasterResult = await SqlClient.query(coasterCmd, Object.values(details))
        imageUrls.forEach(async (imageUrl) => {
            await SqlClient.query(imageCmd, [coasterResult.rows[0].coasterid, imageUrl])
        })
        console.info(details)
        console.info(imageUrls)
        console.info('Inserted successfully.\n')
    } catch (err) {
        console.error('Failed inserting into DB:')
        console.error(err)
    }
}

async function run() {
    SqlClient.connect()

    if (Args.reset) {
        await SqlClient.query('TRUNCATE Coasters')
        await SqlClient.query('TRUNCATE CoasterImages')
    }

    Browser = await puppeteer.launch({ headless: false })
    Driver = await Browser.newPage()

    await scrapeSearchResults(Driver)
}

async function dispose() {
    Browser.close()
    SqlClient.end()
}

run()
    .then(() => console.info('coaster-scraper finished.'))
    .catch((err) => console.error(err))
    .finally(dispose)
