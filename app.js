const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to database using Environment Variables from Railway
const db = mysql.createPool({
  uri: process.env.MYSQL_URL || "mysql://root:cSKvpWezJyVavIilvFdEpQalLALHCxud@nozomi.proxy.rlwy.net:34300/railway",
});

// Middleware support JSON
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(__dirname));

// Serve index.html at the root path "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Example API endpoint at "/API"
app.get("/API", (req, res) => {
  res.send("API is running!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
