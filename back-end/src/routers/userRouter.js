import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController";
import { verifyToken } from "../middleware/authMiddleware";
const router = express.Router();

// Get all user
router.get("/", getAllUsers);
// Get userById
router.get("/:id", getUserById);
//Update user
router.put("/:id", updateUser);

export default router;
