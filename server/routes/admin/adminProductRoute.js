import express from "express";

// Controller
import {
  getAllProducts,
  createProduct,
} from "../../controllers/admin/adminProductController.js";

const router = express.Router();

router.get("/list", getAllProducts);

router.post("/create", createProduct);

export default router;
