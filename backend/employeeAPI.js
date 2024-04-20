const express = require("express");
const router = express.Router();
const db = require("./databaseConfig");
const { generateToken, verifyToken } = require("./authentication");

//Tasks endpoint
//If the employeeID is assigned to a task we will add the taskID to a list and then
//Show all the tasks we have that match that id
router.post("/listEmployees", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedToken = await verifyToken(token);
    const employeeID = decodedToken.user_id;

    db.query(
      "SELECT * FROM employees WHERE employee_id != ?",
      [employeeID],
      (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
          return;
        }
        res.json({success: true, employees: results});

      }
    );

  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});




module.exports = router;
