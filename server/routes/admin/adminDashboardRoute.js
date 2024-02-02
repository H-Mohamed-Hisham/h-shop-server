import express from "express";

// Controller
import {
  getProductCountByCategory,
  getOrderCountFromSpecificDays,
  getUserCountFromSpecificDays,
} from "../../controllers/admin/adminDashboardController.js";

// Middleware
import { auth, admin } from "../../middleware/auth-middleware.js";

const router = express.Router();

router.get("/product-category-stats", auth, admin, getProductCountByCategory);

router.post("/order-stats", auth, admin, getOrderCountFromSpecificDays);

router.post("/user-stats", auth, admin, getUserCountFromSpecificDays);

export default router;
