import express from "express";
import { getSingleUser, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

// get all users
router.get("/", getAllUsers);

// get single users by id
router.get("/:id", getSingleUser);

export default router;
