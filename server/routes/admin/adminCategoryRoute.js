import express from "express";

// Controller
import {
  createCategory,
  updateCategory,
} from "../../controllers/admin/adminCategoryController.js";

// Middleware
import { auth, admin } from "../../middleware/auth-middleware.js";

const router = express.Router();

router.post("/create", auth, admin, createCategory);

router.put("/update", auth, admin, updateCategory);

export default router;
