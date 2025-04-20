const express = require("express");
const habitLog = require("../controllers/habitLog.controller");
const habitLogRoutes = express.Router();

habitLogRoutes.route("/toggle").post(habitLog.toggleHabitLog);

module.exports = habitLogRoutes;
