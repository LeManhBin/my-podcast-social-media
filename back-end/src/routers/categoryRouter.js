import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/categoryController";
const router = express.Router();

router.get("/", getAllCategory);
router.post("/", createCategory);
router.delete("/:idCategory", deleteCategory);
router.put("/:idCategory", updateCategory);

export default router;
