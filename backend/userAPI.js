const express = require("express");
const router = express.Router(); // Create a router instance
const db = require("./databaseConfig");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("./authentication");

router.post("/login", (req, res) => {
  const { username, password } = req.body; // Get username and password from request body
  // Search the database to find the user with the provided username
  db.query(
    "SELECT * FROM employees WHERE employee_username = ?",
    [username],
    (err, results) => {
      if (err) {
        // If there's an error querying the database
        console.error("Database query error:", err);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
        return;
      }
      if (results.length > 0) {
        const user = results[0]; // Get the first user
        if (user.employee_password === password) {
          // Check if the provided password matches the password in the database
          let isAdmin = false; // Initialize isAdmin variable to false
          if (user.employee_manager === 1) {
            // Check if the user is a manager (admin)
            isAdmin = true; // Set isAdmin to true if user is a manager
          }
          // Prepare payload for JWT token including user ID, username, and isAdmin flag
          const tokenPayload = {
            user_id: user.employee_id,
            isAdmin: isAdmin,
          };
          // Generate JWT token with the payload and secret key, setting expiration to 1 hour
          const token = jwt.sign(tokenPayload, process.env.secretKey, {
            expiresIn: "1h",
          });

          const userObj = {
            id: user.employee_id,
            firstname: user.employee_firstname,
            surname: user.employee_surname,
            dob: user.employee_dob,
            email: user.employee_email,
            username: user.employee_username,
            passwordLen: user.employee_password.length,
            isAdmin: isAdmin,
          };
          // Send success response with token and user object
          res.json({
            success: true,
            message: "Login successful",
            token,
            user: userObj,
          });
        } else {
          // If provided password doesn't match the one in the database, return unauthorized response
          res
            .status(401)
            .json({ success: false, message: "Incorrect password" });
        }
      } else {
        // If no user found with the provided username, return not found response
        res.status(404).json({ success: false, message: "User not found" });
      }
    }
  );
});

router.post("/saveAccountSettings", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedToken = await verifyToken(token);
    const employee_id = decodedToken.user_id;
    const { newFirstname, newSurname, newUsername, newPassword } = req.body;
    db.query(
      "UPDATE employees SET employee_firstname = ?, employee_surname = ?, employee_username = ?, employee_password = ? WHERE employee_id = ?",
      [newFirstname, newSurname, newUsername, newPassword, employee_id],
      (err, results) => {
        if (err) {
          console.log("Database query error", err);
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
          return;
        }
        // If the update is successful, you can send a success response
        res.status(200).json({
          success: true,
          message: "Account settings updated successfully",
        });
      }
    );
  } catch (error) {
    console.error("JWT verification error: ", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

module.exports = router; // Export the router
