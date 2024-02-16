import express from "express";

// Controller
import {
  getAllProductsByLimit,
  getProductById,
  getTopRatedProducts,
} from "../../controllers/product/productController.js";

const router = express.Router();

router.get("/list", getAllProductsByLimit);

router.get("/detail", getProductById);

router.get("/top-rated-products", getTopRatedProducts);

// router.get("/:id", getProductById);

export default router;
