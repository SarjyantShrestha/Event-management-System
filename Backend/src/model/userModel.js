import pool from "../config/db.js";
import { getUserById, getAllUsers } from "../query/userQueries.js";

export const fetchUserById = async (userId) => {
  try {
    const result = await pool.query(
      "SELECT id, username, email, created_at FROM users WHERE id = $1",
      [userId],
    );
    return result.rows[0]; // Return the single user
  } catch (error) {
    throw error; // Propagate the error for handling in the controller
  }
};

export const fetchAllUsers = async () => {
  try {
    const result = await pool.query(
      "SELECT id, username, email, created_at FROM users",
    );
    return result.rows; // Return all users
  } catch (error) {
    throw error;
  }
};
