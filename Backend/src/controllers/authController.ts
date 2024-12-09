import argon2 from "argon2";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../initializers/data-source";
import { User } from "../models/User";

const userRepo = AppDataSource.getRepository(User);

// Register User
export const register = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password, role } = req.body;
  try {
    // Check if user exists
    const userExist = await userRepo.findOne({ where: { email: email } });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await argon2.hash(password);

    // Insert user into database
    const user = userRepo.create({
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: hashedPassword,
      role: role || "user",
    });

    await userRepo.save(user); //Save the above model

    res.status(201).json({
      message: "User created successfully",
      user: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login verify
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await userRepo.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json({ message: "This email doesn't exist." });
    }

    // check password
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // generate JWT token
    const token = jwt.sign(
      {
        userId: user.userId,
        role: user.role,
        username: user.firstName,
      },
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
