// backend/routes/config.js
require("dotenv").config({ path: "./backend/routes/.env" });
const mysql = require("mysql2");

// Use MYSQL_URL from .env
const connection = mysql.createConnection(process.env.MYSQL_URL);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database!");
});

module.exports = connection;
