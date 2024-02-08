import express from "express";

// Controller
import {
  getProductCountByCategory,
  getOrderCountFromSpecificDays,
  getUserCountFromSpecificMonths,
  getSalesStatFromSpecificMonths,
} from "../../controllers/admin/adminDashboardController.js";

// Middleware
import { auth, admin } from "../../middleware/auth-middleware.js";

const router = express.Router();

router.get("/product-category-stats", auth, admin, getProductCountByCategory);

router.post("/order-stats", auth, admin, getOrderCountFromSpecificDays);

router.post("/user-stats", auth, admin, getUserCountFromSpecificMonths);

router.post("/sales-stats", auth, admin, getSalesStatFromSpecificMonths);

export default router;
