import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../app/slices/authSlice";
import { FiUser } from "react-icons/fi";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Dashboard", to: "/dashboard" },
  { name: "About", to: "#about" },
  { name: "Contact", to: "#contact" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (!token && location.pathname === "/dashboard") {
      navigate("/login");
    }
  }, [token, location, navigate]);

  return (
    <header className="backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-lg sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center gap-2 select-none">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
              HabitVault
            </span>
          </Link>
          {/* Navigation Links */}
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`text-white/80 font-medium hover:text-cyan-300 transition-colors px-2 py-1 rounded-lg ${
                  location.pathname === link.to
                    ? "bg-cyan-400/20 text-cyan-200"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="px-5 py-2 rounded-xl border border-white/20 text-white bg-white/10 hover:bg-white/20 font-semibold transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
