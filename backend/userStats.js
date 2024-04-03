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
      "SELECT t.*, te.task_assigned_date FROM tasks t INNER JOIN task_employees te ON t.task_id = te.task_id WHERE te.id = ? AND t.task_completed_date IS NOT NULL",
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
              const start = new Date(task.task_assigned_date);
              const end = new Date(task.task_completed_date);
              const daysTaken = Math.ceil(
                (end - start) / (1000 * 60 * 60 * 24)
              ); // Convert milliseconds to days

              // Calculate efficiency using the formula
              return (
                (task.task_difficulty / task.task_priority / daysTaken) * 100
              );
            })
          );

          // Calculate overall efficiency
          const sum = efficiencies.reduce((acc, curr) => acc + curr, 0);
          const overallEfficiency = efficiencies.length
            ? (sum / efficiencies.length).toFixed(2) // Round to 2 decimal places
            : 0;

          // Return the overall efficiency as JSON response
          return res.json({ success: true, efficiency: overallEfficiency });
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