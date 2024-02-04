import express from "express";

// Controller
import { getUserProfile } from "../../controllers/user/userController.js";

// Middleware
import { auth } from "../../middleware/auth-middleware.js";

const router = express.Router();

router.route("/profile").get(auth, getUserProfile);

export default router;
