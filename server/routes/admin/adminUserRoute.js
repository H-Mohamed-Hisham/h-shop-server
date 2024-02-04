import express from "express";

// Controller
import { getAllUsers } from "../../controllers/admin/adminUserController.js";

// Middleware
import { auth, admin } from "../../middleware/auth-middleware.js";

const router = express.Router();

router.get("/list", auth, admin, getAllUsers);

export default router;
