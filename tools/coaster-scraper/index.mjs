/**
 * Searches RCDB for all coasters in North America. Scrapes data and up to
 * a maximum number of images by accessing details for each search result.
 * 
 * Also makes some calculations upon saving (such as 4 outside seats / 0 inside seats for Manufacturer=B&M, Model=Wing.)
 * 
 * Flags:
 *   api-host    = URI of the API used for reading/writing data
 *   chrome-path = Path to chrome executable (not needed for local development)
 *   pages       = Which search result pages to scan (all others are ignored)
 *   reset       = If present, clear the database first, otherwise add tool results to existing data
 *  
 *
 * Examples:
 *   node . --api-host=http://127.0.0.1:80
 *   node . --api-host=http://127.0.0.1:80 --pages=10
 *   node . --api-host=http://127.0.0.1:80 --pages=11,14 --reset
 **/


import fetch from 'cross-fetch'
import puppeteer from 'puppeteer'
import minimist from 'minimist'
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client'

/**
 * Allows accessing arguments/flags by name instead of array index.
 **/
const Args = minimist(process.argv.slice(2))

/**
 * Parsed list of comma-separated page numbers.
 * If there are any, all other pages will be skipped.
 **/
const Pages = Args.pages?.split(',')

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
 * 
 **/
const GqlClient = new ApolloClient({
    link: new HttpLink({ uri: Args['api-host'], fetch }),
    cache: new InMemoryCache()
})

/**
 * Used for accessing and controlling the DOM to bring up pages with data/images.
 **/
let Browser = {}
let Driver = {}

async function scrapeSearchResults() {
    await Driver.goto(BaseUrl)

    const totalPages = await Driver.evaluate(() => {
        const lastPageLink = document.querySelector('#rfoot a:nth-last-child(2)')
        return lastPageLink.innerText
    })

    for (let i = 1; i <= totalPages; i++) {
        if (Pages && !Pages.includes(i.toString()))
            continue
            
        await Promise.all([
            Driver.goto(`${BaseUrl}&page=${i}`),
            Driver.waitForNavigation()
        ])

        const pageUrlList = await Driver.evaluate(() => {
            const links = document.querySelectorAll('.stdtbl tbody tr td:nth-child(2) a')
            const urls = Array.from(links).map(e => e.href)
            return urls
        })

        for (let url of pageUrlList) {
            await Driver.goto(url)
            const details = await scrapeDetails(url)
            const imageList = await scrapeImages(url)
            await saveToDb(details, imageList)
        }
    }
}

async function scrapeDetails(link) {
    return await Driver.evaluate(() => {
        function getElementsByXPath(xpath, document, parent) {
            let results = []
            let query = document.evaluate(xpath, parent,
                null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
            for (let i = 0, length = query.snapshotLength; i < length; ++i) {
                results.push(query.snapshotItem(i))
            }
            return results
        }

        const nameElem = document.querySelector('#feature > div:nth-child(1) > h1')
        const name = nameElem?.innerText

        const parkElem = document.querySelector('#feature > div:nth-child(1) > a:nth-child(2)')
        const park = parkElem?.innerText

        const typeElem = document.querySelector('#feature > ul:nth-child(3) > li:nth-child(2) > a')
        const type = typeElem?.innerText

        const modelElem = document.querySelector('#feature > div.scroll > p > a:nth-child(3)')
        const model = modelElem?.innerText || null

        const manufacturerElem = document.querySelector('#feature > div.scroll > p > a:nth-child(1)')
        const manufacturer = manufacturerElem?.innerText ?? 'N/A'

        const lengthElem = getElementsByXPath('//th[contains(text(), "Length")]/following-sibling::td[1]/span', document, document)
        const length = lengthElem[0] ? lengthElem[0].innerText.replace(/,/g, '') : null

        const heightElem = getElementsByXPath('//th[contains(text(), "Height")]/following-sibling::td[1]/span', document, document)
        const height = heightElem[0] ? heightElem[0].innerText.replace(/,/g, '') : null

        const dropElem = getElementsByXPath('//th[contains(text(), "Drop")]/following-sibling::td[1]/span', document, document)
        const drop = dropElem[0] ? dropElem[0].innerText.replace(/,/g, '') : null

        const speedElem = getElementsByXPath('//th[contains(text(), "Speed")]/following-sibling::td[1]/span', document, document)
        const speed = speedElem[0] ? speedElem[0].innerText.replace(/,/g, '') : null

        const inversionsElem = getElementsByXPath('//th[contains(text(), "Inversions")]/following-sibling::td[1]', document, document)
        const inversions = inversionsElem[0] ? inversionsElem[0].innerText.replace(/,/g, '') : null

        const openingDateElem = document.querySelector('#feature > p > time')
        const openingDate = openingDateElem?.innerText

        const trainInfoElem = getElementsByXPath('//*[contains(text(), "Riders are arranged")]', document, document)[0]
        const trainInfo = trainInfoElem?.innerText
        const numCars = trainInfo?.includes('Single car trains.') || trainInfo?.includes('Riders are arranged inline in a single row') ? 1 : (trainInfo ? trainInfo.split('cars')[0].split(' ').at(-2) : null)
        const singleRow = trainInfo ? trainInfo.split('single row').length > 1 : false
        const numSeatsPerRow = trainInfo ? trainInfo.replace('inline ', '').split('Riders are arranged')[1].split(' ')[1] : null
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

        return { name, park, type, model, manufacturer, length, height, drop, speed, inversions, openingDate, numCars, numRowsPerCar, numInsideSeatsPerRow, numOutsideSeatsPerRow }
    })
}

async function scrapeImages(link) {
    const picLinks = await Driver.evaluate(async () => {
        // Take a maximum of fifteen images.
        return Object.values(document.querySelectorAll('.pic-strip a')).slice(0, 15)
    })
    const imgList = []

    for (let i = 1; i <= picLinks.length; i++) {
        await Promise.all([
            Driver.click(`.pic-strip a:nth-child(${i})`),
            Driver.waitForNavigation()
        ])

        const { imageUrl, width, height } = await Driver.evaluate(() => {
            const bs = window.getComputedStyle(document.body)['background-size']
            const bg = window.getComputedStyle(document.body)['background-image']
            const size = bs.split(',')[0]
            const [ width, height ] = size.split(' ')
            const start = bg.indexOf('url("')
            const end = bg.indexOf('"),')
            return {
                imageUrl: bg.substring(start+5, end),
                width: parseInt(width, 10),
                height: parseInt(height, 10)
            }
        })

        imgList.push({ imageUrl, width, height })

        await Promise.all([
            Driver.goto(link),
            Driver.waitForNavigation()
        ])
    }

    return imgList
}

async function saveCoasterToDb(coaster) {
    const { data } = await GqlClient.mutate({
        mutation: gql`
            mutation createCoaster() {
                createCoaster() {
                    coasterId
                }
            }
        `,
        variables: { ...coaster }
    })
    return data
}

async function saveCoasterImageToDb(coasterId, coasterImage) {
    const { data } = await GqlClient.mutate({
        mutation: gql`
            mutation createCoasterImage($coasterId: Int!, $imageUrl: String!, $width: Int!, $height: Int!) {
                createCoasterImage(coasterId: $coasterId, imageUrl: $imageUrl, width: $width, height: $height) {
                    coasterImageId
                }
            }
        `,
        variables: { coasterId, ...coasterImage }
    })
    return data
}

async function verifyCoasterImageDb(coasterImage) {
    const { data } = await GqlClient.mutate({
        mutation: gql`
            mutation verifyCoasterImage($coasterImageId: Int!) {
                verifyCoasterImage(coasterImageId: $coasterImageId) {
                    coasterImageId
                }
            }
        `,
        variables: { coasterImageId: coasterImage.coasterImageId }
    })
    return data
}

async function saveToDb(coaster, imgList) {
    try {

        coaster.url = await generateUrl(coaster.name, coaster.park)

        const savedCoaster = await saveCoasterToDb(coaster)
        for (let img of imgList) {
            const savedImg = await saveCoasterImageToDb(savedCoaster.coasterId, img)
            await verifyCoasterImageDb(savedImg) // Immediately verify image since it is coming straight from RCDB
        }

        console.info(details)
        console.info(imgList)
        console.info('Inserted successfully.\n')

    } catch (err) {
        console.error('Failed inserting into DB:')
        console.error(err)
    }
}

/**
 * Creates a sub url from a coaster name and the park it's from.
 * Handles invalid url characters, international characters, and separates words by dash.
 *
 * Examples:
 *
 * name=Ride Name, park=Fun Park
 * url=ride-name-fun-park
 *
 * name=Siskel & Ebert, park=Macy's Crazy Park
 * url=siskel-ebert-macys-crazy-park
 **/
async function generateUrl(name, park) {
    let uniqueUrl = `${name}@${park}`.toLowerCase()

    const erasedChars = [ /\./g, /\,/g, /\&/g, /'/g, /’/g, /-/g, /(|)/g, /!/g, /:/g, /\*/g ]
    const spaceChars = [ /   /g, /  /g ]
    const dashChars = [ / /g, /@/g ]

    erasedChars.forEach(c => uniqueUrl = uniqueUrl.replace(c, ''))
    spaceChars.forEach(c => uniqueUrl = uniqueUrl.replace(c, ' '))
    dashChars.forEach(c => uniqueUrl = uniqueUrl.replace(c, '-'))

    const internationalCharMap = {
        'á': 'a', 'à': 'a', 'ä': 'a',
        'é': 'e', 'è': 'e', 'ë': 'e',
        'ì': 'i', 'í': 'i',
        'ó': 'o', 'ò': 'o', 'ö': 'o',
        'ú': 'u', 'ù': 'u', 'ü': 'u',
        'ń': 'n', 'ñ': 'n'
    }
    Object.keys(internationalCharMap).forEach(c => uniqueUrl = uniqueUrl.replace(c, internationalCharMap[c]))

    return uniqueUrl
}

async function run() {
    if (Args.reset) {
        console.info('Clearing data.')
        await SqlClient.query('TRUNCATE Coasters')
        await SqlClient.query('TRUNCATE CoasterImages')
    }

    Browser = await puppeteer.launch({
        headless: true,
        executablePath: Args['chrome-path'],
        args: [
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--disable-setuid-sandbox",
            "--no-sandbox"
        ]
    })
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
