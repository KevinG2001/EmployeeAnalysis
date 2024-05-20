const express = require("express");
const router = express.Router();
const db = require("./databaseConfig");
const { generateToken, verifyToken } = require("./authentication");

function formatDate(dateObj) {
  if (!(dateObj instanceof Date) && typeof dateObj !== "string") {
    return dateObj;
  }

  const isoString = dateObj instanceof Date ? dateObj.toISOString() : dateObj;
  const datePart = isoString.split("T")[0]; // Extract date part

  const [year, month, day] = datePart.split("-");
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate; // Return the formatted date
}

//Tasks endpoint
//If the employeeID is assigned to a task we will add the taskID to a list and then
//Show all the tasks we have that match that id
// Tasks endpoint
router.post("/assignedtasks", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedToken = await verifyToken(token);
    const employeeID = decodedToken.user_id;

    db.query(
      "SELECT task_id FROM assignedtasks WHERE employee_id = ?",
      [employeeID],
      (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
          return;
        }

        // Extract taskIds from the results
        const taskIds = results.map((result) => result.task_id);

        // Now query the tasks table with the extracted taskIds, filtering for tasks where task_completed_date is null
        if (taskIds.length === 0) {
          // If there are no taskIds, return an empty array of tasks
          res.json({ success: true, tasks: [] });
        } else {
          db.query(
            "SELECT * FROM tasks WHERE task_id IN (?) AND task_completed_date IS NULL",
            [taskIds],
            (err, tasksResults) => {
              if (err) {
                console.error("Database query error:", err);
                res
                  .status(500)
                  .json({ success: false, message: "Internal server error" });
                return;
              }

              // Format the dates
              const formattedTasks = tasksResults.map((task) => {
                const formattedTask = {
                  ...task,
                  task_duedate: formatDate(task.task_duedate),
                };
                return formattedTask;
              });

              // Returns the tasks that the client is in and are not completed
              res.json({ success: true, tasks: formattedTasks });
            }
          );
        }
      }
    );
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

//Create Task endpoint
//!TODO
//Make it so that you can put the date in like normal day month year not year month day
router.post("/createTask", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedToken = await verifyToken(token);

    // Extract task data from request body
    const { name, priority, difficulty, dueDate, description } = req.body;

    // SQL query to insert task data into the database
    const sql = `
        INSERT INTO tasks (task_name, task_priority, task_difficulty, task_duedate, task_description)
        VALUES (?, ?, ?, ?, ?)
      `;

    // Execute the SQL query
    db.query(
      sql,
      [name, priority, difficulty, dueDate, description],
      (error, results) => {
        if (error) {
          console.error("Error creating task:", error);
          res.status(500).json({ message: "Failed to create task" });
        } else {
          console.log("Task created successfully");
          res.status(201).json({
            message: "Task created successfully",
            taskId: results.insertId,
          });
        }
      }
    );
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
});

//Completed Tasks
router.post("/completedTasks", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedToken = await verifyToken(token);
    const employeeID = decodedToken.user_id;

    //Query the database to search for the users assigned tasks
    db.query(
      "SELECT task_id FROM assignedtasks WHERE employee_id = ?",
      [employeeID],
      (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
          return;
        }

        //maps over assigned tasks and puts the taskids in a variable
        const taskIds = results.map((result) => result.task_id);

        // Now query the tasks table with the extracted taskIds
        if (taskIds.length === 0) {
          // If there are no taskIds, return an empty array of tasks
          res.json({ success: true, tasks: [] });
        } else {
          //Gets all the tasks that the user was assigned that have a completed date (not null)
          db.query(
            "SELECT * FROM tasks WHERE task_id IN (?) AND task_completed_date IS NOT NULL",
            [taskIds],
            (err, tasksResults) => {
              if (err) {
                console.error("Database query error:", err);
                res
                  .status(500)
                  .json({ success: false, message: "Internal server error" });
                return;
              }

              const formattedTasks = tasksResults.map((task) => {
                const formattedTask = {
                  ...task,
                  task_duedate: formatDate(task.task_duedate),
                };
                return formattedTask;
              });
              //Returns the results as json
              res.json({ success: true, tasks: formattedTasks });
            }
          );
        }
      }
    );
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

//Aviable Tasks
router.post("/availabletasks", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedToken = await verifyToken(token);
    const employeeID = decodedToken.user_id;

    db.query(
      "SELECT task_id FROM assignedtasks WHERE employee_id = ?",
      [employeeID],
      (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
          return;
        }

        // Extract taskIds from the results
        const taskIds = results.map((result) => result.task_id);

        // Now query the tasks table with the extracted taskIds, filtering for tasks that are not assigned to the user
        if (taskIds.length === 0) {
          // If there are no taskIds, return all tasks
          db.query("SELECT * FROM tasks", (err, allTasks) => {
            if (err) {
              console.error("Database query error:", err);
              res
                .status(500)
                .json({ success: false, message: "Internal server error" });
              return;
            }
            res.json({ success: true, tasks: allTasks });
          });
        } else {
          db.query(
            "SELECT * FROM tasks WHERE task_id NOT IN (?)",
            [taskIds],
            (err, tasksResults) => {
              if (err) {
                console.error("Database query error:", err);
                res
                  .status(500)
                  .json({ success: false, message: "Internal server error" });
                return;
              }
              // Returns the tasks that are not assigned to the user
              const formattedTasks = tasksResults.map((task) => {
                const formattedTask = {
                  ...task,
                  task_duedate: formatDate(task.task_duedate),
                };
                return formattedTask;
              });
              //Returns the results as json
              res.json({ success: true, tasks: formattedTasks });
            }
          );
        }
      }
    );
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

router.post("/amountOfTasks", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedToken = await verifyToken(token);
    const employeeID = decodedToken.user_id;

    db.query(
      `
      SELECT
        (SELECT COUNT(*) FROM assignedtasks WHERE employee_id = ?) AS assignedTaskCount,
        (SELECT COUNT(*) FROM tasks WHERE task_completed_date IS NOT NULL) AS upComingTaskCount,
        (SELECT COUNT(*) FROM tasks) AS totalTaskCount
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

        const { assignedTaskCount, upComingTaskCount, totalTaskCount } =
          result[0];
        res.json({
          success: true,
          tasks: {
            assignedTaskCount,
            upComingTaskCount,
            totalTaskCount,
          },
        });
      }
    );
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

module.exports = router;
