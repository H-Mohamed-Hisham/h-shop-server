import express from "express";

// Controller
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../../controllers/admin/adminOrderController.js";

// Middleware
import { auth, admin } from "../../middleware/auth-middleware.js";

const router = express.Router();

router.get("/list", auth, admin, getAllOrders);

router.get("/detail", auth, admin, getOrderById);

router.put("/update-status", auth, admin, updateOrderStatus);

export default router;
