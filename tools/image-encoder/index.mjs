/**
 * Goes through CoasterImages table and converts image URL into Base64-encoded
 * string, to be used as image preview which loads more quickly in the browser.
 *
 * Flags:
 *   api-host    = URI of the API used for reading/writing data
 * 
 * Example:
 *   node . --api-host=http://127.0.0.1:80
 **/

import plaiceholder from 'plaiceholder'
import minimist from 'minimist'
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client'

/**
 * Allows accessing arguments/flags by name instead of array index.
 **/
const Args = minimist(process.argv.slice(2))

/**
 * 
 **/
const GqlClient = new ApolloClient({
    link: new HttpLink({ uri: Args['api-host'], fetch }),
    cache: new InMemoryCache()
})

async function encodeAllImages() {
    const coasters = await getCoasters()

    for (let coaster of coasters) {
        const images = await getImagesByCoasterId(coaster.coasterid)

        for (let image of images) {
            const result = await plaiceholder.getPlaiceholder(image.imageurl)
            await saveEncodedImage(coaster, image.imageurl, result.base64)
        }
    }
}

async function saveEncodedImage(coaster, src, base64) {
    console.info(`Updating ${coaster.name}: ${src}\n${base64}\n`)

    // TODO

    // const result = await SqlClient.query('UPDATE CoasterImages SET Base64=$1 WHERE CoasterId=$2 AND ImageUrl=$3', [base64, coaster.coasterid, src])
    // return result.rows
}

async function getImagesByCoasterId(coasterId) {
    const { data } = await GqlClient.query({
        query: gql`{
            query coasterImages($coasterId: Int!) {
                coasterImages(coasterId: $coasterId) {
                    imageUrl
                }
            }
        }`,
        variables: { coasterId }
    })
    return data
}

async function getCoasters() {
    const { data } = await GqlClient.query({
        query: gql`{
            coasters {
                coasterId,
                name
            }
        }`
    })
    return data
}

async function run() {
    await encodeAllImages()
}

async function dispose() {
    //
}

run()
    .then(() => console.info('image-encoder finished.'))
    .catch((err) => console.error(err))
    .finally(dispose)
