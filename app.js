const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
require("dotenv").config();

const routes = require("./backend/config/routes"); // Correctly import routes

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const corsOptions = {
  origin: "http://127.0.0.1:5500",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// ✅ Routes
app.use("/api", routes()); // Call the routes function and mount it at /api

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
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port: ${PORT}`));
