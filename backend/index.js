const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(cors()); // Enable CORS for all routes
require("dotenv").config(); // Load environment variables from .env file
//Database Info
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
//Database connection
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

//Gets the secret key from the .env
const secretKey = process.env.secretKey;

// Login endpoint
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
            username: user.username,
            isAdmin: isAdmin,
          };
          // Generate JWT token with the payload and secret key, setting expiration to 1 hour
          const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "1h" });
          // Send success response with token and message
          res.json({ success: true, message: "Login successful", token });
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

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
