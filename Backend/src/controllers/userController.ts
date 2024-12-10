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
