const authRoutes = require("./auth.routes");
const habitRoutes = require("./habit.routes");
const habitLogRoutes = require("./habitLog.routes");
const statsRoutes = require("./stats.routes");
const { isAuthenticated } = require("../middleware/auth.middleware");

function routes(app) {
  app.use("/api/auth", authRoutes);
  app.use("/api/habit", isAuthenticated, habitRoutes);
  app.use("/api/habitLog", isAuthenticated, habitLogRoutes);
  app.use("/api/stats", isAuthenticated, statsRoutes);
}

module.exports = routes;
