// app.js
const connection = require("./backend/routes/config.js");

const testConnection = () => {
  connection.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err);
    } else {
      console.log("Database connected successfully!");
    }
  });

  connection.query("SELECT 1", (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
    } else {
      console.log("Query result:", results);
    }

    connection.end();
  });
};

testConnection();
