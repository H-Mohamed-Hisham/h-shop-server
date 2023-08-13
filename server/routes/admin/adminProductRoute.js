import express from "express";

// Controller
import { getAllProducts } from "../../controllers/admin/adminProductController.js";

const router = express.Router();

router.get("/list", getAllProducts);

export default router;
