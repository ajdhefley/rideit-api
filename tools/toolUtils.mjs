export function executeQuery(conn, cmd, params) {
    return new Promise((resolve, reject) => {
        conn.query(cmd, params, (error, results) => {
            if (error) reject(error);
            resolve(results || null);
        });
    });
}
  
export function promiseMap(array, func) {
    let promiseArray = array.map((item) => new Promise(async (resolve, reject) => {
        try {
            const result = await func(item);
            resolve(result);
        }
        catch (err) {
            reject(err);
        }
    }));

    return Promise.all(promiseArray);
}
