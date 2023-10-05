import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "../src/config/connectDatabase.js";
import userRouter from "../src/routers/userRouter.js";
import authRouter from "../src/routers/authRouter.js";
import categoryRouter from "../src/routers/categoryRouter.js";
import postRouter from "../src/routers/postRouter.js";
import followRouter from "../src/routers/followRouter.js";
import { handleCleanupOTP } from "./services/otpService.js";
const app = express();
// connectDB
connectDB();
// ------
dotenv.config();
const port = process.env.PORT || 5001;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Gọi hàm để định lịch công việc xóa OTP
handleCleanupOTP();
// Cấu hình lấy avatar
app.use("/avatar", express.static(path.join(__dirname, "./public/avatar")));
// Cấu hình lấy image
app.use("/images", express.static(path.join(__dirname, "./public/images")));
// Cấu hình lấy sound
app.use("/sounds", express.static(path.join(__dirname, "./public/sounds")));
// Cấu hình lấy files
app.use("/files", express.static(path.join(__dirname, "./public/files")));
// Router
//------ User-------
app.use("/api/users", userRouter);
// -------Auth-------
app.use("/api/auth", authRouter);
// -------Category--------
app.use("/api/category", categoryRouter);
// -------Post-------
app.use("/api/post", postRouter);
//--------Follow------
app.use("/api/follow", followRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
