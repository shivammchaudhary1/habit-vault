const Habit = require("../models/habit.model.js");
const HabitLog = require("../models/habitLog.model.js");
const { updateStreak } = require("../services/streak.service.js");

// GET /api/stats/:habitId
const getStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const habitId = req.params.habitId || req.query.habitId;
    if (!habitId) {
      return res.status(400).json({ message: "habitId is required" });
    }

    // Fetch habit
    const habit = await Habit.findOne({ _id: habitId, userId });
    if (!habit) {
      return res
        .status(404)
        .json({ message: "Habit not found or unauthorized" });
    }

    // Fetch all logs for this habit
    const logs = await HabitLog.find({ habitId, userId }).sort({ date: -1 });
    const completedLogs = logs.filter((log) => log.status === "completed");
    const completedDays = completedLogs.length;
    const targetDays = habit.targetDaysInNumber;
    const startDate = habit.startDate;

    // Calculate streaks
    const { currentStreak, longestStreak } = await updateStreak(
      habitId,
      userId
    );

    // Completion rate
    const completionRate =
      targetDays > 0 ? Math.round((completedDays / targetDays) * 100) : 0;

    // Recent activity (last 5 logs)
    const recentLogs = logs.slice(0, 5).map((log) => ({
      _id: log._id,
      date: log.date,
      status: log.status,
    }));

    const allLogs = logs.map((log) => ({
      _id: log._id,
      date: log.date,
      status: log.status,
    }));

    return res.status(200).json({
      success: true,
      stats: {
        currentStreak,
        longestStreak,
        startDate,
        completionRate,
        completedDays,
        targetDays,
        recentLogs,
        allLogs,
      },
    });
  } catch (error) {
    console.error("Get Stats Error:", error);
    return res.status(500).json({ message: "Failed to fetch stats" });
  }
};

module.exports = { getStats };
