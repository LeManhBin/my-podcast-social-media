import otpGenerator from "otp-generator";
import cron from "node-cron";
import db from "../models";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
// tạo  opt là 6 ký tự
export const generateOTP = () => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true, //Dùng số,
    specialChars: false,
  });
  return otp;
};

// Gửi otp qua email
export const sendEmailOtp = (email, otp) => {
  try {
    // Tạo một transporter sử dụng thông tin từ cấu hình
    const transporter = nodemailer.createTransport({
      service: process.env.MAIL_MAILER,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      secure: process.env.MAIL_ENCRYPTION === "SSL", // True nếu sử dụng SSL, ngược lại là false
    });

    // Tạo đối tượng mailOptions cho email bạn muốn gửi
    const mailOptions = {
      from: `${process.env.MAIL_FROM_ADDRESS} <${process.env.MAIL_FROM_NAME}>`,
      to: email,
      subject: "Mã OTP của bạn",
      html: `
        <p>Xin chào,</p>
        <p>Dưới đây là mã OTP của bạn:</p>
        <h2>${otp}</h2>
        <p>Mã OTP này có thời hạn và sẽ hết hạn sau một khoảng thời gian nhất định.</p>
        <p>Xin hãy không chia sẻ mã này với người khác.</p>
        <h3>OTP này chỉ có thời gian tồn tại là 2 phút.</h3>
        <p>Cảm ơn bạn đã sử dụng sản phẩm của chúng tôi.</p>
      `,
    };
    // Gửi email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Gửi email thất bại:", error);
      } else {
        console.log("Email đã được gửi:", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
// Thêm otp vào database
export const insertOtp = async (email, otp) => {
  try {
    console.log("otp", otp);
    const salt = await bcrypt.genSalt(10);
    // Mã hoá Otp
    const hashOtp = await bcrypt.hash(otp, salt);
    const checkOtp = await db.Otp.findAll({ where: { email: email } });
    if (checkOtp.length > 0) {
      return {
        status: 401,
        message: "Otp already exists",
      };
    }
    await sendEmailOtp(email, otp);
    const Otp = await db.Otp.create({
      email: email,
      otp: hashOtp,
    });
    return Otp
      ? {
          status: 200,
          message: "Otp is sending",
        }
      : {
          status: 500,
          message: "Error",
        };
  } catch (error) {
    console.log(error.message);
  }
};

// giải mã OTP
export const validOtp = async (otp, hashOtp) => {
  try {
    const isValid = await bcrypt.compare(otp, hashOtp);
    return isValid;
  } catch (error) {
    console.log(error.message);
  }
};

// Định lịch công việc xóa OTP sau mỗi 120 giây
export const handleCleanupOTP = () => {
  // Dùng cron để đăt lịch
  cron.schedule("*/120 * * * * *", async () => {
    try {
      const currentTime = new Date();
      currentTime.setSeconds(currentTime.getSeconds() - 120); // Giả sử bạn muốn xóa các OTP sau 60 giây

      await db.Otp.destroy({
        where: {
          createdAt: {
            [db.Sequelize.Op.lt]: currentTime,
          },
        },
      });

      console.log("Deleted expired OTPs.");
    } catch (error) {
      console.error("Error deleting expired OTPs:", error);
    }
  });
};
