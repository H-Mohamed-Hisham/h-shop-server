import express from "express";

// Controller
import { signin, signup } from "../../controllers/auth/authController.js";

const router = express.Router();

router.route("/signin").post(signin);

router.route("/signup").post(signup);

export default router;
