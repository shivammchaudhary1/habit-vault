import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, clearError } from "../app/slices/authSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    dispatch(clearError());

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      dispatch(clearError());
      return;
    }

    // Prepare user data for registration
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      const result = await dispatch(registerUser(userData)).unwrap();
      if (result) {
        navigate("/dashboard"); // Redirect after successful registration
      }
    } catch (err) {
      // Error is already handled in the slice
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#0ea5e9] flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md mx-auto backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent mb-6">
            Create your HabitVault account
          </h2>
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white/80 mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                className="block w-full rounded-lg bg-white/20 border border-white/30 px-4 py-2 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/80 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                className="block w-full rounded-lg bg-white/20 border border-white/30 px-4 py-2 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white/80 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                className="block w-full rounded-lg bg-white/20 border border-white/30 px-4 py-2 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white/80 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                className="block w-full rounded-lg bg-white/20 border border-white/30 px-4 py-2 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              />
            </div>
            <div className="flex items-center">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                required
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-cyan-400 focus:ring-cyan-400"
              />
              <label
                htmlFor="agreeTerms"
                className="ml-2 block text-sm text-white/80"
              >
                I agree to the{" "}
                <a href="#" className="text-cyan-300 hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-bold shadow-lg hover:scale-105 transition-transform ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          <div className="mt-8 text-center text-white/80">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-cyan-300 font-semibold hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
