const Habit = require("../models/habit.model.js");
const HabitLog = require("../models/habitLog.model.js");

// Utility to check valid day names
const validDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const createHabit = async (req, res) => {
  try {
    const { name, targetDaysType, targetDays, startDate, targetDaysInNumber } =
      req.body;
    const userId = req.user._id; // From auth middleware

    // === Validations ===

    // 1. Required fields
    if (!name || !targetDaysType || !startDate) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    // 2. Validate targetDaysType
    if (!["Everyday", "Weekdays", "Custom"].includes(targetDaysType)) {
      return res.status(400).json({ message: "Invalid targetDaysType." });
    }

    // 3. If Custom, targetDays must be valid and non-empty
    if (targetDaysType === "Custom") {
      if (!Array.isArray(targetDays) || targetDays.length === 0) {
        return res
          .status(400)
          .json({ message: "targetDays must be a non-empty array." });
      }

      const allValid = targetDays.every((day) => validDays.includes(day));
      if (!allValid) {
        return res
          .status(400)
          .json({ message: "Invalid day(s) in targetDays." });
      }
    }

    // 4. If Weekdays selected, no targetDays should be passed manually
    if (targetDaysType === "Weekdays" && targetDays?.length > 0) {
      return res
        .status(400)
        .json({ message: "Remove targetDays when using Weekdays type." });
    }

    // 5. startDate should not be in the future
    if (new Date(startDate) > new Date()) {
      return res
        .status(400)
        .json({ message: "Start date cannot be in the future." });
    }

    // Calculate targetDaysInNumber based on targetDaysType
    let calculatedTargetDays;
    if (targetDaysType === "Everyday") {
      calculatedTargetDays = 365; // Set to 365 for everyday habits
    } else if (targetDaysType === "Weekdays") {
      calculatedTargetDays = 5; // 5 weekdays
    } else {
      // For Custom, use the provided targetDaysInNumber or calculate from targetDays
      calculatedTargetDays = targetDaysInNumber || targetDays?.length || 0;
    }

    // === Construct habit object ===
    const newHabit = new Habit({
      userId,
      name,
      targetDaysType,
      targetDays: targetDaysType === "Custom" ? targetDays : [],
      targetDaysInNumber: calculatedTargetDays,
      startDate: new Date(startDate),
    });

    await newHabit.save();
    return res
      .status(201)
      .json({ message: "Habit created successfully", habit: newHabit });
  } catch (error) {
    console.error("Create Habit Error:", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

const getHabit = async (req, res) => {
  try {
    const userId = req.user.id;
    const habits = await Habit.find({ userId }).sort({ createdAt: -1 });

    // Enhance habits with today's status
    const enhancedHabits = await Promise.all(
      habits.map(async (habit) => {
        const today = new Date().toISOString().split("T")[0];
        const todayLog = await HabitLog.findOne({
          habitId: habit._id,
          userId,
          date: today,
        });

        return {
          ...habit.toObject(),
          todayStatus: todayLog?.status || null,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: enhancedHabits,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch habits",
    });
  }
};

const updateHabit = async (req, res) => {
  const userId = req.user?.id;
  const habitId = req.params.id;
  const updateData = req.body;

  if (!habitId) {
    return res
      .status(400)
      .json({ success: false, message: "Habit ID is required." });
  }

  try {
    const habit = await Habit.findOne({ _id: habitId, userId });
    if (!habit) {
      return res
        .status(404)
        .json({ success: false, message: "Habit not found or unauthorized." });
    }

    const allowedFields = [
      "name",
      "targetDaysType",
      "targetDays",
      "targetDaysInNumber",
      "startDate",
    ];

    Object.keys(updateData).forEach((key) => {
      if (allowedFields.includes(key)) {
        habit[key] = updateData[key];
      }
    });

    await habit.save();

    res.status(200).json({
      success: true,
      message: "Habit updated successfully.",
      data: habit,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteHabit = async (req, res) => {
  const userId = req.user?.id;
  const habitId = req.params.id;

  if (!habitId) {
    return res
      .status(400)
      .json({ success: false, message: "Habit ID is required." });
  }

  try {
    const habit = await Habit.findOneAndDelete({ _id: habitId, userId });
    if (!habit) {
      return res
        .status(404)
        .json({ success: false, message: "Habit not found or unauthorized." });
    }

    await HabitLog.deleteMany({ habitId });

    res.status(200).json({
      success: true,
      message: "Habit and related logs deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateHabitStatus = async (req, res) => {
  const userId = req.user?.id;
  const habitId = req.params.id;
  const { isActive } = req.body;

  if (!habitId) {
    return res
      .status(400)
      .json({ success: false, message: "Habit ID is required." });
  }

  if (typeof isActive !== "boolean") {
    return res
      .status(400)
      .json({ success: false, message: "Invalid status value." });
  }

  try {
    const habit = await Habit.findOne({ _id: habitId, userId });
    if (!habit) {
      return res
        .status(404)
        .json({ success: false, message: "Habit not found or unauthorized." });
    }

    habit.isActive = isActive;

    // Reset streaks if deactivating
    if (!isActive) {
      habit.streak = 0;
      habit.lastCheckIn = null;
    }

    await habit.save();

    res.status(200).json({
      success: true,
      message: `Habit marked as ${isActive ? "active" : "inactive"}`,
      data: {
        _id: habit._id,
        isActive: habit.isActive,
        streak: habit.streak,
      },
    });
  } catch (error) {
    console.error("Update Habit Status Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update habit status",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  createHabit,
  getHabit,
  updateHabit,
  deleteHabit,
  updateHabitStatus,
};
