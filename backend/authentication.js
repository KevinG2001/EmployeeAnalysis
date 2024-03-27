//File for authentication use with JWT

const jwt = require("jsonwebtoken");
require("dotenv").config();

//Gets the secret key from the .env
const secretKey = process.env.secretKey;

function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error("Unauthorized");
  }
}

module.exports = { generateToken, verifyToken };
