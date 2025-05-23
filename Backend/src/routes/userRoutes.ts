import express from "express";
import { getSingleUser, getAllUsers, getUserProfile, deleteUser, totalUsers } from "../controllers/userController";
import verifyRole from "../middleware/verifyRole";
import { authenticateToken } from "../middleware/authToken";

const router = express.Router();

router.get("/", verifyRole("admin"), getAllUsers);
router.get("/totalusers", verifyRole("admin"), totalUsers);

router.get("/:id", verifyRole("admin"), getSingleUser);

router.delete("/:userId", deleteUser);

router.get("/profile/me", authenticateToken, getUserProfile);

export default router;
