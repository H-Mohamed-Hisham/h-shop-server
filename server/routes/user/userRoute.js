import express from "express";

// Controller
import {
  getUserProfile,
  changePassword,
} from "../../controllers/user/userController.js";

// Middleware
import { auth } from "../../middleware/auth-middleware.js";

const router = express.Router();

router.route("/profile").get(auth, getUserProfile);

router.put("/change-password", auth, changePassword);

export default router;
