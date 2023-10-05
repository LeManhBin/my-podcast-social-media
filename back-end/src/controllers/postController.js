import { pool } from "../config/connectDatabase";
import db from "../models";
import {
  uploadFiles,
  uploadImage,
  uploadSound,
} from "../services/uploadFileService";

export const getAllPost = async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      where: { status: 0 },
      include: [
        { model: db.Category, as: "category" },
        { model: db.User, as: "user" },
      ],
      attributes: { exclude: ["userId", "categoryId"] },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({
      status: 200,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
// Get post by id user
export const getPostByIdUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const posts = await db.Post.findAll({
      where: { userId: idUser, status: 0 },
      include: [
        { model: db.Category, as: "category" },
        { model: db.User, as: "user" },
      ],
      attributes: { exclude: ["userId", "categoryId"] },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({
      status: 200,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
export const getPostByIdUserPrivate = async (req, res) => {
  try {
    const { idUser } = req.params;
    const posts = await db.Post.findAll({
      where: { userId: idUser, status: 1 },
      include: [
        { model: db.Category, as: "category" },
        { model: db.User, as: "user" },
      ],
      attributes: { exclude: ["userId", "categoryId"] },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({
      status: 200,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

// Get post by id Category
export const getPostByIdCategory = async (req, res) => {
  try {
    const { idCategory } = req.params;
    const posts = await db.Post.findAll({
      where: { categoryId: idCategory, status: 0 },
      include: [
        { model: db.Category, as: "category" },
        { model: db.User, as: "user" },
      ],
      attributes: { exclude: ["userId", "categoryId"] },
    });
    res.status(200).json({
      status: 200,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

//  Get post by following
export const getPostFollowing = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        status: 400,
        message: "Bad request",
      });
    }
    const [row] = await pool.query(
      "SELECT posts.*, users.id as idUser, users.name as name, users.nickName, users.avatar FROM posts INNER JOIN follows ON follows.userId = posts.userId INNER JOIN users ON posts.userId = users.id WHERE follows.following = ? ORDER BY posts.createdAt DESC",
      [userId]
    );

    const formatResult = row?.map((r) => ({
      id: r?.id,
      categoryId: r?.categoryId,
      image: r?.image,
      description: r?.description,
      sound: r?.sound,
      status: r?.status,
      createdAt: r?.createdAt,
      updatedAt: r?.updatedAt,
      user: {
        id: r?.idUser,
        name: r?.name,
        avatar: r?.avatar,
        nickName: r?.nickName,
      },
    }));
    res.status(200).json({
      status: 200,
      data: formatResult,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

// Create post
export const createPost = async (req, res) => {
  try {
    uploadFiles.fields([{ name: "image" }, { name: "sound" }])(
      req,
      res,
      async (err) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ message: "Lỗi khi tải lên files" });
        }
        const { userId, categoryId, description, status } = req.body;
        const uploadedImage = req.files?.image[0]?.filename;
        const uploadedSound = req.files?.sound[0]?.filename;

        const newPost = await db.Post.create({
          userId: userId,
          categoryId: categoryId,
          description: description,
          status: status,
          image: uploadedImage,
          sound: uploadedSound,
        });
        res.status(200).json({
          status: 200,
          message: {
            userId,
            categoryId,
            description,
            status,
            image: uploadedImage,
            sound: uploadedSound,
          },
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
