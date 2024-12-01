import pool from "../config/db.js";

export const fetchUserById = async (userId) => {
  try {
    const result = await pool.query(
      "SELECT user_id, firstname, lastname, email, created_at, role, status FROM users WHERE id = $1",
      [userId],
    );
    return result.rows[0];
  } catch (error) {
    throw error; //send error to controller
  }
};

export const fetchAllUsers = async () => {
  try {
    const result = await pool.query(
      "SELECT user_id, firstname, lastname, email, created_at, role, status FROM users",
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};
