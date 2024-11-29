import pool from "../config/db.js";
import { getUserById, getAllUsers } from "../query/userQueries.js";

export const fetchUserById = async (userId) => {
  try {
    const result = await pool.query(getUserById, [userId]);
    return result.rows[0]; // Return the single user
  } catch (error) {
    throw error; // Propagate the error for handling in the controller
  }
};

export const fetchAllUsers = async () => {
  try {
    const result = await pool.query(getAllUsers);
    return result.rows; // Return all users
  } catch (error) {
    throw error;
  }
};
