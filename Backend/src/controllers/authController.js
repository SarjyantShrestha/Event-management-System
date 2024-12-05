import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

// Register User
export const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    // Check if user exists
    const userExists = await pool.query(
      "SELECT * FROM Users WHERE email = $1",
      [email],
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const currentDate = new Date();
    const newUser = await pool.query(
      "INSERT INTO Users (firstname, lastname, email, password, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [firstname, lastname, email, hashedPassword, currentDate],
    );

    res.status(201).json({
      message: "User created successfully",
      user: newUser.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login verify
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM Users WHERE email = $1", [
      email,
    ]);
    // check if email matches
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "This email doesn't exist." });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // generate JWT token
    const token = jwt.sign(
      { userId: user.rows[0].user_id, role: user.rows[0].role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
