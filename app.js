const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
require("dotenv").config();

const { PORT } = require("./config");
const routes = require("./routes");

const app = express();

// ✅ Set up the path for uploads folder
const uploadsPath = path.join(__dirname, "uploads");

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// ✅ Static route for serving uploads
app.use(
  "/uploads",
  express.static(uploadsPath, {
    setHeaders: (res) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Cache-Control", "no-store");
    },
  })
);

// ✅ Use Routes
app.use("/api", routes);

// ✅ Handle 404 Not Found
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Global Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Server running on port: ${PORT}`));
