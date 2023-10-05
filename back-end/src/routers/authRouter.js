import express from "express";
import {
  handleLogin,
  handleRegister,
  verifyOtp,
} from "../controllers/authController";
const router = express.Router();

// Register
router.post("/register", handleRegister);
router.post("/verify-otp", verifyOtp);
router.post("/login", handleLogin);
export default router;
