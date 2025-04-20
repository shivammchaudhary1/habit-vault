import React, { useEffect, useState } from "react";
import {
  FiSearch,
  FiCalendar,
  FiPlus,
  FiFilter,
  FiCheck,
  FiX,
  FiMenu,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../app/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  fetchHabits,
  selectAllHabits,
  deleteHabit,
  updateHabitStatus, // <-- add this import
} from "../app/slices/habitSlice";
import AddHabitModal from "../modals/AddHabitModal";
import { toggleHabitLog } from "../app/slices/habitLogSlice";
import HabitStats from "../modals/HabitStats";
import { fetchHabitStats } from "../app/slices/statsSlice";
import { selectStats, selectStatsLoading } from "../app/slices/statsSlice";
import DashboardContentCard from "../components/DashboardContentCard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const habits = useSelector(selectAllHabits);
  const navigate = useNavigate();
  const stats = useSelector(selectStats);
  const statsLoading = useSelector(selectStatsLoading);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loadingHabits, setLoadingHabits] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [sortAsc, setSortAsc] = useState(false); // false = desc, true = asc

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  console.log("habits:", habits);

  const handleToggleHabit = async (habitId) => {
    try {
      setLoadingHabits((prev) => ({ ...prev, [habitId]: true }));
      await dispatch(toggleHabitLog(habitId)).unwrap();
      dispatch(fetchHabits()); // Refresh habits to get updated data
    } catch (error) {
      console.error("Failed to toggle habit:", error);
    } finally {
      setLoadingHabits((prev) => ({ ...prev, [habitId]: false }));
    }
  };

  const handleDeleteHabit = async (habitId) => {
    if (!window.confirm("Are you sure you want to delete this habit?")) return;
    try {
      setLoadingHabits((prev) => ({ ...prev, [habitId]: true }));
      await dispatch(deleteHabit(habitId)).unwrap();
    } catch (error) {
      console.error("Failed to delete habit:", error);
    } finally {
      setLoadingHabits((prev) => ({ ...prev, [habitId]: false }));
    }
  };

  const handleHabitClick = async (habit) => {
    setSelectedHabit(habit);
    setDrawerOpen(true);
    try {
      await dispatch(fetchHabitStats(habit._id));
    } catch (error) {
      console.error("Failed to fetch habit stats:", error);
    }
  };

  // Add handler for status change
  const handleStatusChange = async (id, isActive) => {
    try {
      setLoadingHabits((prev) => ({ ...prev, [id]: true }));
      await dispatch(updateHabitStatus({ id, isActive })).unwrap();
      await dispatch(fetchHabits());
    } catch (error) {
      console.error("Failed to update habit status:", error);
    } finally {
      setLoadingHabits((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const filteredHabits = habits.filter((habit) =>
    habit.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort by createdAt
  const sortedHabits = [...filteredHabits].sort((a, b) =>
    sortAsc
      ? new Date(a.createdAt) - new Date(b.createdAt)
      : new Date(b.createdAt) - new Date(a.createdAt)
  );

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  // Calculate completed habits for today using lastCheckIn
  const isToday = (dateStr) => {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    const now = new Date();
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  };

  const completedToday = habits.filter((habit) => isToday(habit.lastCheckIn));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#0ea5e9] flex">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 flex flex-col ${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white/10 backdrop-blur-lg border-r border-white/20 shadow-xl`}
      >
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
            {sidebarOpen ? "HabitVault" : "HV"}
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-lg hover:bg-white/20"
          >
            <FiMenu size={20} />
          </button>
        </div>
        <div className="p-4 mt-4 flex-1">
          {sidebarOpen && (
            <>
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-cyan-300 tracking-widest">
                  TRACKING
                </h3>
                <p className="mt-2 text-sm text-white/80">
                  Track your daily habits and build streaks to stay consistent.
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-cyan-300 tracking-widest">
                  STATS
                </h3>
                <p className="mt-2 text-sm text-white/80">
                  {completedToday.length} of {habits.length} habits done today.
                </p>
              </div>
            </>
          )}
        </div>
        <div className="p-4 border-t border-white/20">
          <div
            className="flex items-center gap-3 cursor-pointer hover:bg-white/20 p-2 rounded-lg"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="bg-gradient-to-br from-cyan-400 to-fuchsia-400 p-2 rounded-full">
              <FiUser size={18} className="text-white" />
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="font-medium text-white">
                  {user?.name || "User Profile"}
                </p>
                <p className="text-xs text-cyan-200">View account</p>
              </div>
            )}
          </div>
          {showProfileMenu && (
            <div className="mt-2 ml-12 bg-white/10 border border-white/20 rounded-lg p-2 shadow-lg">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full p-2 text-left hover:bg-white/20 rounded-md text-white"
              >
                <FiLogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4 flex flex-wrap items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-cyan-300" />
              <input
                type="text"
                placeholder="Search habits..."
                className="pl-10 pr-4 py-2 rounded-lg border border-white/20 bg-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 text-cyan-100">
              <FiCalendar />
              <span>{today}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              <FiPlus /> Add Habit
            </button>
            <button
              onClick={() => setSortAsc((prev) => !prev)}
              className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-xl text-white bg-white/10 hover:bg-white/20"
            >
              <FiFilter /> Sort {sortAsc ? "↑" : "↓"}
            </button>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent mb-8">
            Today's Habits
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedHabits.map((habit) => {
              const isCompleted = isToday(habit.lastCheckIn);
              const isInactive = habit.isActive === false;

              return (
                <DashboardContentCard
                  key={habit._id}
                  habit={habit}
                  isCompleted={isCompleted}
                  isInactive={isInactive}
                  loading={loadingHabits[habit._id]}
                  onToggle={() => handleToggleHabit(habit._id)}
                  onDelete={() => handleDeleteHabit(habit._id)}
                  onClick={() => handleHabitClick(habit)}
                  onStatusChange={handleStatusChange} // <-- pass handler
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Habit Stats Drawer - moved to HabitStats component */}
      <HabitStats
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        habit={selectedHabit}
        stats={stats}
        loading={statsLoading}
      />

      {/* Overlay when drawer is open */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
