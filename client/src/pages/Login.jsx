import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { loginUser } from "../app/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData:", formData);
    setError("");

    try {
      const resultAction = await dispatch(loginUser(formData));
      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/dashboard"); // Redirect on successful login
      } else {
        setError(resultAction.payload || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#0ea5e9] flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md mx-auto backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent mb-6">
            Sign in to HabitVault
          </h2>
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white/80 mb-1"
                >
                  Password
                </label>
                <a
                  href="/forgot-password"
                  className="text-xs text-cyan-300 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                className="block w-full rounded-lg bg-white/20 border border-white/30 px-4 py-2 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Sign in
            </button>
          </form>
          <div className="mt-8 text-center text-white/80">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-cyan-300 font-semibold hover:underline"
            >
              Sign up
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
