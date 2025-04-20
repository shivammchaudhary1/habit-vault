// components/DashboardContentCard.jsx
import React, { useState } from "react";
import { FiCheck, FiX, FiEdit2, FiPower, FiTrash2 } from "react-icons/fi";
import { Dialog } from "@headlessui/react";
import { updateHabitStatus } from "../app/slices/habitSlice";

const DashboardContentCard = ({
  habit,
  isCompleted,
  isInactive,
  loading,
  onToggle,
  onDelete,
  onClick,
  onStatusChange,
}) => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const handleStatusChange = async (newStatus) => {
    try {
      console.log("Updating status to:", newStatus);
      setIsUpdatingStatus(true);
      await onStatusChange(habit._id, newStatus);
      setIsStatusModalOpen(false);
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <>
      <div
        onClick={onClick}
        className={`backdrop-blur-lg bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#0ea5e9] border border-white/20 rounded-2xl p-6 shadow-2xl flex flex-col gap-3 hover:scale-105 transition-transform cursor-pointer group relative overflow-hidden
          ${isCompleted ? "ring-2 ring-emerald-400" : ""}
          ${isInactive ? "opacity-50 grayscale relative" : ""}`}
      >
        {/* Decorative gradient ring */}
        <div className="absolute -inset-1 rounded-2xl pointer-events-none group-hover:opacity-40 opacity-20 bg-gradient-to-tr from-cyan-400/30 via-fuchsia-400/20 to-indigo-400/30 blur-2xl z-0" />
        <div className="flex justify-between items-center relative z-10">
          <h3 className="font-bold text-lg text-white flex items-center gap-2 ">
            {habit.name}
            <span
              className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold shadow-sm ${
                habit.isActive
                  ? "bg-green-700/80 text-green-200"
                  : "bg-gray-700/80 text-gray-200"
              }`}
            >
              {habit.isActive ? "Active" : "Inactive"}
            </span>
          </h3>

          <div className="flex gap-2 items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsStatusModalOpen(true);
              }}
              disabled={loading}
              className="p-2 rounded-full bg-blue-500/80 text-white hover:bg-blue-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              title="Change Status"
              type="button"
            >
              <FiPower size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              disabled={loading || isInactive}
              className={`p-2 rounded-full transition-colors border-2 border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer ${
                isCompleted
                  ? "bg-emerald-400 text-white border-emerald-400"
                  : "bg-white/10 text-gray-400 border-white/20"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              title={isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
              type="button"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mx-auto"></div>
              ) : (
                <FiCheck
                  size={18}
                  className={isCompleted ? "text-white" : "text-gray-400"}
                />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              disabled={loading}
              className="p-2 rounded-full bg-rose-500/80 text-white hover:bg-rose-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-400"
              title="Delete Habit"
              type="button"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-1 relative z-10">
          <div className="flex justify-between items-center">
            <span className="text-sm text-cyan-200 font-medium">
              Streak: <span className="font-bold">{habit.streak}</span> days
            </span>
            <span className="text-xs text-white/60">
              Longest:{" "}
              <span className="font-semibold">{habit.longestStreak}</span> days
            </span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-white/70">
              Start Date:{" "}
              {habit.startDate
                ? new Date(habit.startDate).toLocaleDateString()
                : "-"}
            </span>
          </div>
        </div>
      </div>

      {/* Status Change Modal */}
      <Dialog
        open={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="fixed inset-0 bg-black/50" />
        <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-xl p-6 max-w-md w-full mx-4 z-50 border border-white/20">
          <Dialog.Title className="text-xl font-bold text-white mb-4">
            Change Habit Status
          </Dialog.Title>
          <Dialog.Description className="text-white/80 mb-6">
            Set "{habit.name}" as {habit.isActive ? "inactive" : "active"}?
          </Dialog.Description>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsStatusModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors"
              disabled={isUpdatingStatus}
            >
              Cancel
            </button>
            <button
              onClick={() => handleStatusChange(!habit.isActive)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-medium hover:opacity-90 transition-opacity"
              disabled={isUpdatingStatus}
            >
              {isUpdatingStatus ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-4"></div>
              ) : (
                `Mark as ${habit.isActive ? "Inactive" : "Active"}`
              )}
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default DashboardContentCard;
