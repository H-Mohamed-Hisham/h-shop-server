import express from "express";

// Controller
import {
  signin,
  getUserProfile,
} from "../../controllers/user/userController.js";

// Middleware
import { auth } from "../../middleware/auth-middleware.js";

const router = express.Router();

router.route("/signin").post(signin);

router.route("/profile").get(auth, getUserProfile);

export default router;
