require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 4000,
  CORS_OPTIONS: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
};
