import express from "express";

// Controller
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../controllers/admin/adminProductController.js";

// Middleware
import { auth, admin } from "../../middleware/auth-middleware.js";

const router = express.Router();

router.get("/list", auth, admin, getAllProducts);

router.post("/create", auth, admin, createProduct);

router.put("/update", auth, admin, updateProduct);

router.post("/delete", auth, admin, deleteProduct);

export default router;
