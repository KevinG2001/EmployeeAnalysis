const express = require("express");
const router = express.Router();
const db = require("./db");
const { generateToken, verifyToken } = require("./auth");

app.post("/login", (req, res) => {
  const { username, password } = req.body; // Get username and pass from body
  // Search the database to find the user with the provided username
  db.query(
    "SELECT * FROM employees WHERE username = ?",
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
        if (user.password === password) {
          // Check if the provided password matches the password in the database
          let isAdmin = false; // Initialize isAdmin variable to false
          if (user.manager === 1) {
            // Check if the user is a manager (admin)
            isAdmin = true; // Set isAdmin to true if user is a manager
          }
          // Prepare payload for JWT token including user ID, username, and isAdmin flag
          const tokenPayload = {
            user_id: user.id,
            isAdmin: isAdmin,
          };
          // Generate JWT token with the payload and secret key, setting expiration to 1 hour
          const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "1h" });

          const userObj = {
            id: user.id,
            firstname: user.name,
            surname: user.surname,
            dob: user.dob,
            email: user.email,
            isAdmin: isAdmin,
          };
          // Send success response with token and message
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

module.exports = router;
