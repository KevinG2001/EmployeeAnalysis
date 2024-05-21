const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./userAPI");
const taskRoutes = require("./tasksAPI");
const userStatsRoute = require("./userStats");
const employeeRoute = require("./employeeAPI");
const taskStats = require("./taskStats");
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api/user", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/stats", userStatsRoute);
app.use("/api/employees", employeeRoute);
app.use("/api/taskstats", taskStats);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
