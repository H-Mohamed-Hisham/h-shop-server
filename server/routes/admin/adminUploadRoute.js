import express from "express";

// Controller
import { imageUpload } from "../../controllers/admin/adminUploadController.js";

// Middleware
import { auth, admin } from "../../middleware/auth-middleware.js";

const router = express.Router();

router.post("/image", auth, admin, imageUpload);

export default router;
