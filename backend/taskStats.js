const express = require("express");
const router = express.Router();
const db = require("./databaseConfig");
const { verifyToken } = require("./authentication");

router.post("/amountOfTasks", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedToken = await verifyToken(token);
    const employeeID = decodedToken.user_id;

    db.query(
      `
        SELECT
          (SELECT COUNT(*) FROM tasks) AS totalTaskCount,
          (SELECT COUNT(*) FROM assignedtasks WHERE employee_id = ?) AS assignedTaskCount,
          (SELECT COUNT(*) FROM tasks WHERE task_completed_date IS NULL) AS upComingTaskCount,
          (SELECT COUNT(*) FROM tasks WHERE task_duedate < CURDATE()) AS overdueCount
      `,
      [employeeID],
      (err, result) => {
        if (err) {
          console.error("Database query error:", err);
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
          return;
        }

        const {
          assignedTaskCount,
          upComingTaskCount,
          totalTaskCount,
          overdueCount,
        } = result[0];
        res.json({
          success: true,
          stats: {
            assignedTaskCount,
            upComingTaskCount,
            totalTaskCount,
            overdueCount,
          },
        });
      }
    );
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

router.post("/percentages", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = await verifyToken(token);
    const employeeID = decodedToken.user_id;

    db.query(
      `
        SELECT
          (SELECT COUNT(*) FROM tasks) AS totalTaskCount,
          (SELECT COUNT(*) FROM assignedtasks WHERE employee_id = ?) AS assignedTaskCount,
          (SELECT COUNT(*) FROM tasks WHERE task_completed_date IS NOT NULL) AS completedTaskCount,
          (SELECT COUNT(*) FROM tasks WHERE task_completed_date IS NUll) AS notCompletedTaskCount
      `,
      [employeeID],
      (err, result) => {
        if (err) {
          console.error("Database query error:", err);
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
          return;
        }

        const {
          assignedTaskCount,
          completedTaskCount,
          totalTaskCount,
          notCompletedTaskCount,
        } = result[0];
        const assignedCount = parseInt(assignedTaskCount);
        const totalCount = parseInt(totalTaskCount);
        const completedTaskPercentage = (
          (completedTaskCount / totalCount) *
          100
        ).toFixed(2);

        const closedTaskPercentage = (
          (notCompletedTaskCount / totalCount) *
          100
        ).toFixed(2);

        res.json({
          success: true,
          stats: {
            completedTaskPercentage,
            closedTaskPercentage,
          },
        });
      }
    );
  } catch (error) {
    console.error("JWT verification error: ", error);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

module.exports = router;
