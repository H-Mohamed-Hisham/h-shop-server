import express from "express";

// Controller
import { getProductCountByCategory } from "../../controllers/admin/adminDashboardController.js";

// Middleware
import { auth, admin } from "../../middleware/auth-middleware.js";

const router = express.Router();

router.get("/product-category/stats", auth, admin, getProductCountByCategory);

export default router;
