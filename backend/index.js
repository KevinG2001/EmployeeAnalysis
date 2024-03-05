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
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM employees WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
        return;
      }
      if (results.length > 0) {
        const user = results[0];
        if (user.password === password) {
          // Generate JWT token
          const token = jwt.sign(
            { user_id: user.id, username: user.username },
            secretKey,
            { expiresIn: "1h" }
          );
          res.json({ success: true, message: "Login successful", token });
        } else {
          res
            .status(401)
            .json({ success: false, message: "Incorrect password" });
        }
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    }
  );
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
