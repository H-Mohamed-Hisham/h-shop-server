import express from "express";

// Controller
import {
  getAllCategory,
  getCategoryById,
} from "../../controllers/category/categoryController.js";

const router = express.Router();

router.get("/list", getAllCategory);

router.get("/detail", getCategoryById);

export default router;
