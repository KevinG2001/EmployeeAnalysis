const express = require("express");
const router = express.Router();
const db = require("./databaseConfig");
const { verifyToken } = require("./authentication");

router.post("/efficiency", async (req, res) => {
  try {
    // Extract token from request headers
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token and extract user ID
    const decodedToken = await verifyToken(token);
    const employeeID = decodedToken.user_id;

    // Check the database to get completed tasks assigned to the user
    //t is tasks table and te is task_employees table
    db.query(
      "SELECT t.*, at.task_assignedDate FROM tasks t INNER JOIN assignedtasks at ON t.task_id = at.task_id WHERE at.employee_id = ? AND t.task_completed_date IS NOT NULL",
      [employeeID],
      async (err, tasksResults) => {
        if (err) {
          console.error("Database query error:", err);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }

        try {
          // Calculate efficiency for each completed task
          const efficiencies = await Promise.all(
            tasksResults.map(async (task) => {
              // Perform efficiency calculation here using task data
              const start = new Date(task.task_assignedDate);
              const end = new Date(task.task_completed_date);
              const daysTaken = Math.ceil(
                (end - start) / (1000 * 60 * 60 * 24)
              ); // Convert milliseconds to days

              // Calculate efficiency using the formula
              const efficiency = (
                (task.task_difficulty / task.task_priority / daysTaken) *
                100
              ).toFixed(2);

              // Return efficiency for the current task
              return {
                task_id: task.task_id,
                task_name: task.task_name,
                efficiency: efficiency,
              };
            })
          );

          // Calculate overall efficiency
          const overallEfficiency = efficiencies.length
            ? (
                efficiencies.reduce(
                  (acc, curr) => acc + parseFloat(curr.efficiency),
                  0
                ) / efficiencies.length
              ).toFixed(2)
            : 0;

          // Return the overall efficiency as JSON response
          return res.json({
            success: true,
            stats: {
              overallEfficiency: overallEfficiency,
              efficiencies: efficiencies,
            },
          });
        } catch (error) {
          console.error("Error calculating efficiency:", error);
          return res.status(500).json({
            success: false,
            message: "Error calculating efficiency",
          });
        }
      }
    );
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

router.post("/doughnutStats", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = await verifyToken(token);
    const employeeId = req.body.employeeId;

    db.query(
      "SELECT t.*, at.task_assignedDate FROM tasks t INNER JOIN assignedtasks at ON t.task_id = at.task_id WHERE at.employee_id = ?",
      [employeeId],
      async (err, tasksResults) => {
        if (err) {
          console.error("Database query error:", err);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }

        try {
          // Calculate efficiency for each completed task
          const efficiencies = await Promise.all(
            tasksResults.map(async (task) => {
              const start = new Date(task.task_assignedDate);
              const end = new Date(task.task_completed_date);
              const daysTaken = Math.ceil(
                (end - start) / (1000 * 60 * 60 * 24)
              ); // Convert milliseconds to days

              const efficiency = (
                (task.task_difficulty / task.task_priority / daysTaken) *
                100
              ).toFixed(2);

              return {
                task_id: task.task_id,
                task_name: task.task_name,
                efficiency: efficiency,
              };
            })
          );

          const overallEfficiency = efficiencies.length
            ? (
                efficiencies.reduce(
                  (acc, curr) => acc + parseFloat(curr.efficiency),
                  0
                ) / efficiencies.length
              ).toFixed(2)
            : 0;

          let totalTasksDone = 0;
          let totalTasksPastDueDate = 0;

          tasksResults.forEach((task) => {
            if (task.task_completed_date) {
              totalTasksDone++;

              if (
                new Date(task.task_completed_date) > new Date(task.task_duedate)
              ) {
                totalTasksPastDueDate++;
              }
            }
          });

          const timeliness = totalTasksDone
            ? ((totalTasksDone - totalTasksPastDueDate) / totalTasksDone) * 100
            : 100;

          return res.json({
            success: true,
            stats: {
              overallEfficiency: overallEfficiency,
              timeliness: timeliness,
              efficiencies: efficiencies,
            },
          });
        } catch (error) {
          console.error("Error calculating efficiency:", error);
          return res.status(500).json({
            success: false,
            message: "Error calculating efficiency",
          });
        }
      }
    );
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

module.exports = router;
