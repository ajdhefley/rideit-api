export function executeQuery(conn, cmd) {
  return new Promise((resolve, reject) => {
    conn.query(cmd, (error, results) => {
      if (error) reject(error);
      resolve(results || null);
    });
  });
}
