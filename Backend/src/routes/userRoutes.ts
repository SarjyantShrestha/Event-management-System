import express from "express";
import { getSingleUser, getAllUsers } from "../controllers/userController";
import verifyRole from "../middleware/verifyRole";

const router = express.Router();

router.get("/", verifyRole("admin"), getAllUsers);

router.get("/:id", verifyRole("admin"), getSingleUser);

export default router;
