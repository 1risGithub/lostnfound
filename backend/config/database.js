const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  uri:
    process.env.MYSQL_URL ||
    "mysql://root:cSKvpWezJyVavIilvFdEpQalLALHCxud@nozomi.proxy.rlwy.net:34300/railway",
});

pool
  .getConnection()
  .then(() => console.log("✅ Connected to the database!"))
  .catch((err) => console.error("❌ Database connection error:", err));

module.exports = pool;
