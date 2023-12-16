import express from "express";

// Controller
import { getAllOrders } from "../../controllers/admin/adminOrderController.js";

// Middleware
import { auth, admin } from "../../middleware/auth-middleware.js";

const router = express.Router();

router.get("/list", auth, admin, getAllOrders);

export default router;
