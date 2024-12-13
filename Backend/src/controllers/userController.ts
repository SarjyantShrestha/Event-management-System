import { User } from "../models/User";
import { Request, Response } from "express";

import { AppDataSource } from "../initializers/data-source";

const userRepo = AppDataSource.getRepository(User);

// Get a user by ID
export const getSingleUser = async (req: Request, res: Response) => {
  const userId = req.params.user_id as string;
  try {
    const user = await userRepo.findOne({ where: { userId: parseInt(userId) } })

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
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepo.find()
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//get user profile
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    // Use the userId from res.locals (set by authenticateToken middleware)
    const userId = res.locals.userId;
    console.log(userId);

    // Fetch user details, excluding sensitive information like password
    const user = await userRepo.findOne({
      where: { userId: userId },
      select: ['userId', 'firstName', 'lastName', 'email', 'role'] // Specify fields you want to return
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//delete User
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId as string;
  try {
    const user = await userRepo.findOne({ where: { userId: parseInt(userId) } })

    if (user) {
      await userRepo.remove(user);
      res.status(200).json({ message: "User deleted", data: user })
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    console.log(e)

  }
}

export const totalUsers = async (req: Request, res: Response) => {
  try {
    const total = await userRepo.count();
    res.status(200).json({ totalUsers: total });
  } catch (error) {
    console.error("Error fetching total users:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};
