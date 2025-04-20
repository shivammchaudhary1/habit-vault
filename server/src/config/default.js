require("dotenv").config();

const config = {
  port: process.env.PORT || 4500,
  mongo: process.env.MONGODB_URL || "mongodb://localhost:27017/misogiai",
  jwtKey: process.env.JWT_KEY,
};

module.exports = config;
