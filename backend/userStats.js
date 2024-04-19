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
            overallEfficiency: overallEfficiency,
            efficiencies: efficiencies,
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
