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

    let query = "UPDATE employees SET ";
    const params = [];
    if (newFirstname) {
      query += "employee_firstname = ?, ";
      params.push(newFirstname);
    }
    if (newSurname) {
      query += "employee_surname = ?, ";
      params.push(newSurname);
    }
    if (newUsername) {
      query += "employee_username = ?, ";
      params.push(newUsername);
    }
    if (newPassword) {
      query += "employee_password = ?, ";
      params.push(newPassword);
    }
    //Remove last , and space
    query = query.slice(0, -2);
    query += " WHERE employee_id = ?";
    params.push(employee_id);
    console.log(query, employee_id);

    db.query(query, params, (err, results) => {
      if (err) {
        console.log("Database query error", err);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
      // If the update is successful, you can send a success response
      res.status(200).json({
        success: true,
        message: "Account settings updated successfully",
      });
    });
  } catch (error) {
    console.error("JWT verification error: ", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

router.post("/createEmployee", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedToken = await verifyToken(token);

    const { firstname, surname, dob, email, username, password, isManager } =
      req.body;
    if (isManager) {
      isManger = 1;
    } else {
      isManager = 2;
    }

    const query = `INSERT INTO employees (employee_firstname, employee_surname, employee_dob, employee_email, employee_username, employee_password, employee_manager)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(
      query,
      [firstname, surname, dob, email, username, password, isManager],
      (error, results) => {
        if (error) {
          console.error("Error creating employee", error);
          res.status(500);
        } else {
          console.log("Employee Created");
          res.status(201).json({
            message: "Employee Created",
          });
        }
      }
    );
  } catch (error) {
    console.error("JWT verification error: ", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

module.exports = router; // Export the router
