import db from "../models";
import { uploadAvatar } from "../services/uploadFileService";

// Get all user
export const getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({});
    res.status(200).json({
      status: 200,
      data: users,
      message: "Get all user success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get userById
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findOne({
      where: { id: id },
      attributes: { exclude: ["password"] }, // Loại bỏ trường 'password'
    });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    res.status(200).json({
      status: 200,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await db.User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    // Sử dụng middleware uploadAvatar để xử lý tải lên hình ảnh
    uploadAvatar.single("avatar")(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: "Lỗi khi tải lên hình ảnh" });
      }

      const { name, nickName, summary } = req.body;
      console.log("=======", name, nickName, summary);

      // Lấy tên tệp hình ảnh từ req.file (nếu có), hoặc giữ nguyên tên cũ
      const avatarFilename = req.file ? req.file.filename : user.avatar;

      // Cập nhật thông tin người dùng
      const updateUser = await db.User.update(
        {
          name: name,
          summary: summary,
          nickName: nickName,
          avatar: avatarFilename,
        },
        { where: { id: userId } }
      );
      res.status(200).json({
        status: 200,
        data: {
          name: name,
          summary: summary,
          nickName: nickName,
          avatar: avatarFilename,
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
