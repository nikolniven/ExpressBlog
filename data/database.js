const mysql = require("mysql2/promise");

const myPool = mysql.createPool({
  host: "localhost",
  database: "blog",
  user: "root",
  password: "December_mammamia",
});

async function query(sql, params) {
  const connection = await myPool.getConnection();
  try {
    const [rows, fields] = await connection.query(sql, params);
    return [rows, fields];
  } finally {
    connection.release();
  }
}

module.exports = {
  myPool,
  query,
};
