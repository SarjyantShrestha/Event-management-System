import express from "express";
import { getSingleUser, getAllUsers } from "../controllers/userController";
import verifyRole from "../middleware/verifyRole";

const router = express.Router();

// Route to get all users - only accessible by 'admin'
router.get("/", verifyRole("admin"), getAllUsers);

// Route to get a single user by id - only accessible by 'admin'
router.get("/:id", verifyRole("admin"), getSingleUser);

export default router;