const HabitLog = require("../models/habitLog.model.js");
const { getDaysBetweenDates } = require("../config/utility/dateUtils.js");

const updateStreak = async (habitId, userId) => {
  try {
    // Get all completed logs sorted by date (ascending)
    let logs = await HabitLog.find({
      habitId,
      userId,
      status: "completed",
    }).sort({ date: 1 });

    // Edge case: No logs
    if (!logs || logs.length === 0) {
      return { currentStreak: 0, longestStreak: 0 };
    }

    // Remove duplicate/same-day logs (keep only one per day)
    logs = logs.filter((log, idx, arr) => {
      if (idx === 0) return true;
      const prevLog = arr[idx - 1];
      const logDate = new Date(log.date).toISOString().slice(0, 10);
      const prevDate = new Date(prevLog.date).toISOString().slice(0, 10);
      return logDate !== prevDate;
    });

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    // Calculate streaks
    for (let i = 0; i < logs.length; i++) {
      const currentLog = logs[i];
      const prevLog = logs[i - 1];

      if (!prevLog) {
        // First log - start streak
        tempStreak = 1;
      } else {
        const daysBetween = getDaysBetweenDates(
          new Date(prevLog.date),
          new Date(currentLog.date)
        );

        if (daysBetween === 1) {
          // Consecutive day - increment streak
          tempStreak++;
        } else if (daysBetween > 1) {
          // Gap detected - reset streak
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
        // Same day - already filtered out
      }

      // Update longest streak
      longestStreak = Math.max(longestStreak, tempStreak);
    }

    // Handle case where last log is today or yesterday (UTC)
    const lastLogDate = new Date(logs[logs.length - 1].date);
    const today = new Date();
    const todayUTC = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
    );
    const yesterdayUTC = new Date(todayUTC);
    yesterdayUTC.setUTCDate(todayUTC.getUTCDate() - 1);
    const lastLogUTC = new Date(
      Date.UTC(
        lastLogDate.getUTCFullYear(),
        lastLogDate.getUTCMonth(),
        lastLogDate.getUTCDate()
      )
    );

    if (
      lastLogUTC.getTime() === todayUTC.getTime() ||
      lastLogUTC.getTime() === yesterdayUTC.getTime()
    ) {
      currentStreak = tempStreak;
    } else {
      currentStreak = 0;
    }

    return {
      currentStreak,
      longestStreak,
    };
  } catch (error) {
    console.error("Update Streak Error:", error);
    throw new Error("Failed to update streaks");
  }
};

module.exports = { updateStreak };
