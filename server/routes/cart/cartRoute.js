import express from "express";

// Controller
import { getCartProducts } from "../../controllers/cart/cartController.js";

const router = express.Router();

router.route("/list").post(getCartProducts);

export default router;
