import express from "express";

// Controller
import { checkout } from "../../controllers/order/orderController.js";

// Middleware
import { auth } from "../../middleware/auth-middleware.js";

const router = express.Router();

router.route("/checkout").post(auth, checkout);

export default router;
