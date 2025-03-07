const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config({ path: "./backend/routes/.env" });

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection(process.env.MYSQL_URL);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = connection;
