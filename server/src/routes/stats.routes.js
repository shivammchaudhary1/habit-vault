const express = require("express");
const stats = require("../controllers/stats.controller");
const statsRoutes = express.Router();

statsRoutes.route("/get/:habitId").get(stats.getStats);

module.exports = statsRoutes;
