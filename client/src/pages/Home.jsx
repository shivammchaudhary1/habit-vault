import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const features = [
  {
    name: "Add & Manage Habits",
    description:
      "Easily create, edit, and organize your daily habits in one place.",
    icon: (
      <svg
        className="w-7 h-7 text-cyan-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    name: "Visual Streaks & Check-ins",
    description:
      "Stay motivated with streak counters and daily check-in reminders.",
    icon: (
      <svg
        className="w-7 h-7 text-fuchsia-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m4 0h-1v-4h-1m-4 0h-1v-4h-1"
        />
      </svg>
    ),
  },
  {
    name: "Heatmaps & Insights",
    description:
      "Track your progress with beautiful heatmaps and performance analytics.",
    icon: (
      <svg
        className="w-7 h-7 text-emerald-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 17v-2a4 4 0 014-4h14"
        />
      </svg>
    ),
  },
  {
    name: "Secure & Personalized",
    description:
      "Your data is protected and your experience is tailored to you.",
    icon: (
      <svg
        className="w-7 h-7 text-indigo-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3v2a3 3 0 01-3 3h-2a3 3 0 01-3-3v-2z"
        />
      </svg>
    ),
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#0ea5e9] flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Hero Section */}
        <section className="text-center max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">
            HabitVault
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-white/80 font-medium">
            Consistency beats intensity – Build better habits with clarity and
            streaks
          </p>
          <p className="mt-6 text-lg text-white/70">
            HabitVault helps you add, manage, and track habits with daily
            check-ins, visual streaks, heatmaps, and secure personalized
            insights.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold shadow-lg hover:bg-white/20 hover:scale-105 transition-transform"
            >
              Login
            </Link>
          </div>
        </section>
        {/* Features Section */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-5xl">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col items-center shadow-xl hover:scale-105 transition-transform"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2 text-center">
                {feature.name}
              </h3>
              <p className="text-white/80 text-center">{feature.description}</p>
            </div>
          ))}
        </section>
        {/* About Section */}
        <section id="about" className="mt-24 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            Why HabitVault?
          </h2>
          <p className="text-lg text-white/80 mb-6">
            HabitVault is designed for anyone who wants to build lasting habits
            with a beautiful, distraction-free interface. Our dashboard,
            streaks, and analytics keep you motivated and accountable every day.
          </p>
        </section>
        {/* How It Works Section */}
        <section className="mt-20 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="text-lg font-bold text-white mb-2">Add Habits</h3>
              <p className="text-white/80">
                Create new habits and set your schedule in seconds.
              </p>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl mb-3">🔥</div>
              <h3 className="text-lg font-bold text-white mb-2">
                Track Streaks
              </h3>
              <p className="text-white/80">
                Check in daily and watch your streaks grow with visual feedback.
              </p>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-lg font-bold text-white mb-2">
                See Insights
              </h3>
              <p className="text-white/80">
                Analyze your progress with heatmaps and habit analytics.
              </p>
            </div>
          </div>
        </section>
        {/* Testimonials Section */}
        <section
          className="mt-24 max-w-4xl mx-auto text-center"
          id="testimonials"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent mb-8">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg">
              <p className="text-white/80 italic mb-2">
                "HabitVault made it so easy to stick to my daily routines. The
                streaks are super motivating!"
              </p>
              <span className="text-cyan-300 font-semibold">— Priya S.</span>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg">
              <p className="text-white/80 italic mb-2">
                "The dashboard is beautiful and the analytics help me see real
                progress. Love it!"
              </p>
              <span className="text-fuchsia-300 font-semibold">— Arjun M.</span>
            </div>
          </div>
        </section>
        {/* Call to Action Section */}
        <section className="mt-24 text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            Ready to build your best habits?
          </h2>
          <Link
            to="/register"
            className="inline-block px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-bold shadow-xl hover:scale-105 transition-transform mt-2"
          >
            Join HabitVault Free
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
