import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const HabitHeatmap = ({ allLogs }) => {
  // Map allLogs to [[dateString, value], ...] for calendar heatmap
  const getCalendarData = (allLogs) => {
    const logsByDate = {};
    (allLogs || []).forEach((log) => {
      const dateStr = new Date(log.date).toISOString().slice(0, 10);
      logsByDate[dateStr] = log.status === "completed" ? 1 : 0;
    });
    // Generate all days for 2025
    const year = 2025;
    const start = +echarts.time.parse(year + "-01-01");
    const end = +echarts.time.parse(year + 1 + "-01-01");
    const dayTime = 3600 * 24 * 1000;
    const data = [];
    for (let time = start; time < end; time += dayTime) {
      const dateStr = echarts.time.format(time, "{yyyy}-{MM}-{dd}", false);
      data.push([
        dateStr,
        logsByDate[dateStr] !== undefined ? logsByDate[dateStr] : 0,
      ]);
    }
    return data;
  };

  const getHeatmapOption = () => ({
    tooltip: {
      backgroundColor: "#18181b",
      borderColor: "#27272a",
      borderWidth: 1,
      textStyle: { color: "#fff" },
      formatter: function (params) {
        const dateStr = params.data[0];
        const value = params.data[1];
        const dateObj = new Date(dateStr);
        const dayName = dateObj.toLocaleDateString("en-US", {
          weekday: "long",
        });
        const formatted = dateObj.toLocaleDateString("en-GB");
        let status = value === 1 ? "completed" : "missed";
        let color = value === 1 ? "#22c55e" : "#a3a3a3";
        return `<b>${dayName}, ${formatted}</b><br>Status: <span style='color:${color}'>${status}</span>`;
      },
    },
    visualMap: {
      min: 0,
      max: 1,
      type: "piecewise",
      orient: "horizontal",
      left: "center",
      top: 20,
      inRange: {
        color: ["#27272a", "#22c55e"],
      },
      itemWidth: 18,
      itemHeight: 12,
      textStyle: { color: "#a3a3a3" },
      splitNumber: 2,
      pieces: [
        { value: 1, label: "Completed", color: "#22c55e" },
        { value: 0, label: "Missed", color: "#27272a" },
      ],
    },
    calendar: {
      top: 80,
      left: 20,
      right: 20,
      cellSize: ["auto", 15],
      range: "2025",
      itemStyle: {
        borderWidth: 0.5,
        borderColor: "#23232b",
        borderRadius: 6,
      },
      splitLine: { show: false },
      yearLabel: { show: false },
      monthLabel: {
        color: "#e5e7eb",
        fontWeight: 600,
        nameMap: "en",
        margin: 16,
      },
      dayLabel: {
        color: "#a3a3a3",
        fontWeight: 500,
        nameMap: "en",
      },
      backgroundColor: "transparent",
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: getCalendarData(allLogs),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(34,197,94,0.5)",
        },
      },
    },
    backgroundColor: "transparent",
  });

  return (
    <div className="bg-gradient-to-br from-[#18181b] to-[#23232b] rounded-3xl shadow-2xl border border-[#23232b] px-8 py-6 mx-auto w-full max-w-3xl min-w-0 transition-shadow duration-200 group relative">
      <div className="flex justify-center items-center">
        <ReactECharts
          option={getHeatmapOption()}
          style={{
            height: 220,
            width: "100%",
            background: "transparent",
            borderRadius: 18,
          }}
        />
      </div>
    </div>
  );
};

export default HabitHeatmap;
