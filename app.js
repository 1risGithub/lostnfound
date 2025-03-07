const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to database using Environment Variables from Railway
const db = mysql.createPool({
  uri: process.env.MYSQL_URL || "mysql://root:password@localhost:3306/db_name",
});

// Middleware support JSON
app.use(express.json());

// Testing API
app.get("/", (req, res) => {
  res.send("API is running!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
