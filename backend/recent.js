const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // To load environment variables

const app = express();
app.use(cors());
app.use(express.json());

// Set up database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // Replace with your MySQL username
  password: 'Home1234?', // Replace with your MySQL password
  database: 'employeewebsite'  // Replace with your MySQL database name
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Exit process with failure
  }
  console.log('Connected to the MySQL database.');
});

// Middleware for token verification
function verifyToken(req, res, next) {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Failed to authenticate token' });
    req.user = decoded;
    next();
  });
}

// Define API routes

// Get recent tasks
app.get('/api/recent-tasks', (req, res) => {
  const query = 'SELECT * FROM task ORDER BY created_at DESC LIMIT 5';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ message: 'Server error while fetching tasks', error: error.message });
      return;
    }
    res.json({ tasks: results });
  });
});

// Get goals for the week
app.get('/api/week-goals', (req, res) => {
  const query = 'SELECT * FROM goals ORDER BY created_at DESC LIMIT 5';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching goals:', error);
      res.status(500).json({ message: 'Server error while fetching goals', error: error.message });
      return;
    }
    res.json({ goals: results });
  });
});

// Example of a protected route with token authentication
app.post('/api/stats/efficiency', verifyToken, (req, res) => {
  // Replace with your actual logic
  const query = 'SELECT * FROM efficiency_stats'; // Example query
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching efficiency stats:', error);
      res.status(500).json({ message: 'Server error while fetching efficiency stats', error: error.message });
      return;
    }
    res.json({ stats: results });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

