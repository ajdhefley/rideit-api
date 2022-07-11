export function getElementsByXPath(xpath, parent) {
    let results = []
    let query = document.evaluate(xpath, parent,
        null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    for (let i = 0, length = query.snapshotLength; i < length; ++i) {
        results.push(query.snapshotItem(i))
    }
    return results
}
  
export function promiseMap(array, func) {
    let promiseArray = array.map((item) => new Promise(async (resolve, reject) => {
        try {
            const result = await func(item)
            resolve(result)
        }
        catch (err) {
            reject(err)
        }
    }))

    return Promise.all(promiseArray)
}

export function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}