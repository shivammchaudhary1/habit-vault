import React, { useState } from "react";
import {
  FiX,
  FiTrendingUp,
  FiAward,
  FiClock,
  FiChevronRight,
  FiMaximize2,
  FiMinimize2,
} from "react-icons/fi";
import ReactECharts from "echarts-for-react";
import HabitHeatmap from "../components/HabitHeatmap";

const HabitStats = ({ open, onClose, habit, stats, loading }) => {
  const [expanded, setExpanded] = useState(false);
  if (!habit) return null;
  const displayStats = stats || {
    currentStreak: 0,
    longestStreak: 0,
    startDate: habit.startDate || new Date(),
    completionRate: 0,
    completedDays: 0,
    targetDays: 0,
    recentLogs: [],
    allLogs: [],
  };

  console.log("Habit Stats", displayStats);

  // Helper to get the last 5 weeks (ending today)
  const getLast5WeeksDates = () => {
    const today = new Date();
    const dates = [];
    // Go to the last Sunday (start of this week)
    const end = new Date(today);
    end.setHours(0, 0, 0, 0);
    // Find the last Sunday
    end.setDate(end.getDate() - end.getDay());
    // Go back 4 more weeks (total 5 weeks)
    for (let week = 4; week >= 0; week--) {
      const weekDates = [];
      for (let day = 0; day < 7; day++) {
        const d = new Date(end);
        d.setDate(end.getDate() - week * 7 + day);
        weekDates.push(new Date(d));
      }
      dates.push(weekDates);
    }
    return dates; // [ [Sun,Mon,...Sat], ... 5 weeks ]
  };

  const getHeatmapData = (allLogs) => {
    const logsByDate = {};
    (allLogs || []).forEach((log) => {
      const dateStr = new Date(log.date).toISOString().slice(0, 10);
      logsByDate[dateStr] = log;
    });
    const weeks = getLast5WeeksDates();
    const data = [];
    weeks.forEach((week, y) => {
      week.forEach((date, x) => {
        const dateStr = date.toISOString().slice(0, 10);
        const log = logsByDate[dateStr];
        let value = 0;
        let status = "not found";
        if (log) {
          if (log.status === "completed") {
            value = 1;
            status = "completed";
          } else {
            value = 0;
            status = log.status || "missed";
          }
        } else {
          value = -1;
          status = "missed";
        }
        data.push([
          x, // day index (Sun=0)
          y, // week index (top=0)
          value,
          dateStr,
          status,
        ]);
      });
    });
    return data;
  };

  const getHeatmapOption = () => ({
    tooltip: {
      position: "top",
      formatter: function (params) {
        const [x, y, value, dateStr, status] = params.data;
        const dateObj = new Date(dateStr);
        const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
          dateObj.getDay()
        ];
        // Use green if status is completed, else gray
        let color = status === "completed" ? "#22c55e" : "#a3a3a3";
        return `<b>${dateObj.toLocaleDateString()} (${day})</b><br>Status: <span style='color:${color}'>${status}</span>`;
      },
    },
    grid: { height: "80%", top: "10%" },
    xAxis: {
      type: "category",
      data: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      splitArea: { show: true },
      axisLabel: { color: "#fff" },
    },
    yAxis: {
      type: "category",
      data: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
      splitArea: { show: true },
      axisLabel: { color: "#fff" },
    },
    visualMap: {
      min: -1,
      max: 1,
      calculable: false,
      show: false,
      inRange: { color: ["#a3a3a3", "#e5e7eb", "#22c55e"] }, // gray for missed/not found, green for completed
      textStyle: { color: "#fff" },
    },
    series: [
      {
        name: "Completion",
        type: "heatmap",
        data: getHeatmapData(displayStats.allLogs),
        label: { show: false },
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowColor: "rgba(0,0,0,0.5)" },
        },
      },
    ],
  });

  return (
    <div
      className={`fixed top-0 right-0 h-full z-50 transition-all duration-300 ease-in-out \
        ${open ? "translate-x-0" : "translate-x-full"} \
        ${expanded ? "w-full md:w-3/4 lg:w-2/3" : "w-full md:w-1/3 lg:w-1/4"} \
        bg-gradient-to-b from-[#0f172a] to-[#1e293b] shadow-2xl`}
    >
      <div className="p-6 h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{habit.name}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setExpanded((e) => !e)}
              className="p-2 rounded-full hover:bg-white/10"
              title={expanded ? "Minimize" : "Expand"}
            >
              {expanded ? (
                <FiMinimize2 className="text-white" />
              ) : (
                <FiMaximize2 className="text-white" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10"
              title="Close"
            >
              <FiX className="text-white" />
            </button>
          </div>
        </div>
        {loading ? (
          <div className="text-center text-white py-10">Loading stats...</div>
        ) : (
          <>
            <div className="bg-white/10 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FiTrendingUp className="text-emerald-400" />
                  <span className="text-white">Current Streak</span>
                </div>
                <span className="text-2xl font-bold text-emerald-400">
                  {displayStats.currentStreak} days
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FiAward className="text-amber-400" />
                  <span className="text-white">Longest Streak</span>
                </div>
                <span className="text-2xl font-bold text-amber-400">
                  {displayStats.longestStreak} days
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiClock className="text-cyan-400" />
                  <span className="text-white">Started</span>
                </div>
                <span className="text-white">
                  {displayStats.startDate
                    ? new Date(displayStats.startDate).toLocaleDateString()
                    : "-"}
                </span>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Completion Rate
              </h3>
              <div className="w-full bg-white/20 rounded-full h-4 mb-2">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-4 rounded-full"
                  style={{ width: `${displayStats.completionRate || 0}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-white/80">
                <span>{displayStats.completedDays} completed</span>
                <span>{displayStats.targetDays} target days</span>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Monthly Activity
              </h3>
              <HabitHeatmap allLogs={displayStats.allLogs} />
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-white mb-3">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {(displayStats.recentLogs || []).map((log) => (
                  <div
                    key={log._id}
                    className="flex items-center justify-between"
                  >
                    <span className="text-white">
                      {new Date(log.date).toLocaleDateString()}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        log.status === "completed"
                          ? "bg-emerald-400/20 text-emerald-400"
                          : "bg-rose-400/20 text-rose-400"
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
              <button className="mt-3 text-sm text-cyan-400 hover:underline flex items-center gap-1">
                View all activity <FiChevronRight />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HabitStats;

// Note: The above code is a React component that displays habit statistics in a modal.
