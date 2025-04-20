const express = require("express");
const { port } = require("./src/config/default");
const connect = require("./src/config/connect");
var cors = require("cors");
const routes = require("./src/routes/main.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Register all routes
routes(app);

// Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
app.listen(port, async () => {
  await connect();
  console.log(`Server running on port ${port}`);
});
