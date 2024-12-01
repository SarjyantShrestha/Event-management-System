import { fetchUserById, fetchAllUsers } from "../model/userModel.js";

// Get a user by ID
export const getSingleUser = async (req, res) => {
  const userId = req.params.user_id; // Extract user ID from request params
  try {
    const user = await fetchUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await fetchAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
