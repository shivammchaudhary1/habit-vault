const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    targetDaysInNumber: {
      type: Number,
      required: true,
    },
    targetDaysType: {
      type: String,
      enum: ["Everyday", "Weekdays", "Custom"],
      required: true,
    },
    targetDays: {
      type: [String],
      enum: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      default: [],
    },
    completedDays: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    streak: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastCheckIn: {
      type: Date,
      default: null,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;
