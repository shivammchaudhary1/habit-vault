const HabitLog = require("../models/habitLog.model.js");
const Habit = require("../models/habit.model.js");
const { updateStreak } = require("../services/streak.service.js");

const toggleHabitLog = async (req, res) => {
  try {
    const { habitId, date = new Date() } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!habitId) {
      return res.status(400).json({ error: "Habit ID is required" });
    }

    // Check if habit exists and belongs to user
    const habit = await Habit.findOne({ _id: habitId, userId });
    if (!habit) {
      return res.status(404).json({ error: "Habit not found or unauthorized" });
    }

    // Format date to YYYY-MM-DD
    const formattedDate = new Date(date).toISOString().split("T")[0];

    // Find or create log
    let habitLog = await HabitLog.findOne({
      habitId,
      userId,
      date: formattedDate,
    });

    if (habitLog) {
      // Toggle between completed and missed
      habitLog.status =
        habitLog.status === "completed" ? "missed" : "completed";
    } else {
      // Create new log (default to completed)
      habitLog = new HabitLog({
        habitId,
        userId,
        date: formattedDate,
        status: "completed",
      });
    }

    // Save the log
    await habitLog.save();

    // Update streaks
    const { currentStreak, longestStreak } = await updateStreak(
      habitId,
      userId
    );

    // Only update lastCheckIn if status is completed
    let lastCheckInUpdate = {};
    if (habitLog.status === "completed") {
      lastCheckInUpdate.lastCheckIn = new Date();
    } else {
      lastCheckInUpdate.lastCheckIn = null;
    }

    // Update habit with new streaks and lastCheckIn if completed
    const updatedHabit = await Habit.findByIdAndUpdate(
      habitId,
      {
        streak: currentStreak,
        longestStreak: Math.max(habit.longestStreak, longestStreak),
        ...lastCheckInUpdate,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      habitLog,
      currentStreak,
      longestStreak,
      habit: updatedHabit,
    });
  } catch (error) {
    console.error("Toggle Habit Log Error:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

module.exports = { toggleHabitLog };
