const express = require("express");
const habit = require("../controllers/habit.controller");
const habitRoutes = express.Router();

habitRoutes.route("/create").post(habit.createHabit);
habitRoutes.route("/get").get(habit.getHabit);
habitRoutes.route("/update/:id").put(habit.updateHabit);
habitRoutes.route("/delete/:id").delete(habit.deleteHabit);
habitRoutes.route("/update-status/:id").patch(habit.updateHabitStatus);

module.exports = habitRoutes;
