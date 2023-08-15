import express from "express";

// Controller
import {
  getAllProducts,
  createProduct,
} from "../../controllers/admin/adminProductController.js";

// Middleware
import { auth, admin } from "../../middleware/auth-middleware.js";

const router = express.Router();

router.get("/list", auth, admin, getAllProducts);

router.post("/create", auth, admin, createProduct);

export default router;
