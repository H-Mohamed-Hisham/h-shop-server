import express from "express";

// Controller
import {
  checkout,
  getMyOrders,
  getMyOrderById,
} from "../../controllers/order/orderController.js";

// Middleware
import { auth } from "../../middleware/auth-middleware.js";

const router = express.Router();

router.get("/my-orders", auth, getMyOrders);

router.get("/my-order", auth, getMyOrderById);

router.route("/checkout").post(auth, checkout);

export default router;
