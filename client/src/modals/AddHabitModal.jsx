import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createHabit } from "../app/slices/habitSlice";
import { FiX } from "react-icons/fi";

const AddHabitModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    targetDaysType: "Everyday",
    targetDays: [],
    startDate: new Date().toISOString().split("T")[0],
  });
  const [errors, setErrors] = useState({});

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
            ? [...prev.targetDays, value]
            : prev.targetDays.filter((day) => day !== value)
          : value,
    }));
  };

  const calculateTargetDaysInNumber = () => {
    if (formData.targetDaysType === "Everyday") return 7;
    if (formData.targetDaysType === "Weekdays") return 5;
    return formData.targetDays.length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!formData.name.trim()) {
      newErrors.name = "Habit name is required";
    }

    if (
      formData.targetDaysType === "Custom" &&
      formData.targetDays.length === 0
    ) {
      newErrors.targetDays = "Select at least one day";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const habitData = {
        ...formData,
        targetDaysInNumber: calculateTargetDaysInNumber(),
      };

      await dispatch(createHabit(habitData)).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to create habit:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#0ea5e9] border border-white/20 rounded-2xl shadow-2xl p-8 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-fuchsia-400 transition-colors"
          aria-label="Close"
        >
          <FiX size={28} />
        </button>
        <h2 className="text-2xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent mb-6">
          Add New Habit
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white/80 mb-1"
            >
              Habit Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg border border-white/20 bg-white/20 px-4 py-2 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                errors.name ? "border-fuchsia-400" : ""
              }`}
              placeholder="e.g. Drink Water"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-fuchsia-400">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Frequency *
            </label>
            <div className="flex gap-4 mt-2">
              {["Everyday", "Weekdays", "Custom"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 text-white/80"
                >
                  <input
                    type="radio"
                    name="targetDaysType"
                    value={type}
                    checked={formData.targetDaysType === type}
                    onChange={handleChange}
                    className="accent-cyan-400"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
          {formData.targetDaysType === "Custom" && (
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Select Days *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {daysOfWeek.map((day) => (
                  <label
                    key={day}
                    className="flex items-center gap-2 text-white/80"
                  >
                    <input
                      type="checkbox"
                      name="targetDays"
                      value={day}
                      checked={formData.targetDays.includes(day)}
                      onChange={handleChange}
                      className="accent-fuchsia-400"
                    />
                    {day}
                  </label>
                ))}
              </div>
              {errors.targetDays && (
                <p className="mt-1 text-sm text-fuchsia-400">
                  {errors.targetDays}
                </p>
              )}
            </div>
          )}
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-white/80 mb-1"
            >
              Start Date *
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
              className="mt-1 block w-full rounded-lg border border-white/20 bg-white/20 px-4 py-2 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-white/20 text-white bg-white/10 hover:bg-white/20 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Create Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHabitModal;
