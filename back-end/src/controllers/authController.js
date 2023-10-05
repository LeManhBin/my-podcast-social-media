import db from "../models";
import { generateOTP, insertOtp, validOtp } from "../services/otpService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Register user
export const handleRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await db.User.findAll({ where: { email: email } });
    const otp = generateOTP();
    if (user.length > 0) {
      return res.status(401).json({
        status: 401,
        message: "Email already exists",
      });
    }
    if (!name || !email || !password) {
      return res.status(400).json({
        status: 400,
        message: "Bad request",
      });
    }
    res.status(200).json({
      status: 200,
      element: await insertOtp(email, otp),
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

// Verify Otp
export const verifyOtp = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;
    const otpHolder = await db.Otp.findAll({ where: { email: email } });
    if (!otpHolder.length) {
      return res.status(404).json({
        status: 404,
        message: "Expired OTP",
      });
    }
    const isValid = await validOtp(otp, otpHolder[0]?.dataValues?.otp);
    if (isValid == false) {
      return res.status(400).json({
        status: 400,
        message: "wrong otp",
      });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    if (isValid == true && email === otpHolder[0]?.dataValues?.email) {
      const user = await db.User.create({
        name,
        email,
        password: hashPassword,
      });
      // Delete otp
      await db.Otp.destroy({ where: { email: email } });
      res.status(200).json({
        status: 200,
        message: "Register success",
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

// Login
export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        message: "Bad request",
      });
    }
    const user = await db.User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = await jwt.sign(
        {
          id: user.id,
          user: user,
        },
        process.env.SECRET_KET
      );
      res.status(200).json({
        status: 200,
        token: token,
        data: user,
      });
    } else {
      return res.status(401).json({
        status: 401,
        message: "Tài khoản hoặc mật khẩu không chính xác",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
