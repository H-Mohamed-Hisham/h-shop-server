import express from "express";

// Controller
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../controllers/admin/adminCategoryController.js";

// Middleware
import { auth, admin } from "../../middleware/auth-middleware.js";

const router = express.Router();

router.post("/create", auth, admin, createCategory);

router.post("/update", auth, admin, updateCategory);

router.post("/delete", auth, admin, deleteCategory);

export default router;
