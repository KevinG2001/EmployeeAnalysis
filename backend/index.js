const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./user");
const taskRoutes = require("./tasks");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api/user", userRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
