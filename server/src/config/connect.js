const mongoose = require("mongoose");
const config = require("./default");

const connect = async () => {
  try {
    await mongoose.connect(config.mongo); // No options needed for Mongoose 6+
    console.log("Database connected");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

module.exports = connect;
