import express from "express";
import {
  createPost,
  getAllPost,
  getPostByIdCategory,
  getPostByIdUser,
  getPostByIdUserPrivate,
  getPostFollowing,
} from "../controllers/postController";
const router = express.Router();

router.get("/", getAllPost);
router.get("/user/:idUser", getPostByIdUser);
router.get("/user-private/:idUser", getPostByIdUserPrivate);
router.get("/category/:idCategory", getPostByIdCategory);
router.get("/following/:userId", getPostFollowing);
router.post("/", createPost);
export default router;
