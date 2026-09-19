const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql
  .createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "192604",
    database: process.env.DB_NAME || "event_booking",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  .promise();

db.getConnection()
  .then((connection) => {
    console.log("✅ Connected to MySQL database!");
    connection.release();
  })
  .catch((err) => {
    console.error("❌ MySQL connection error:", err.message);
  });

module.exports = db;