import express from "express";

// Controller
import {
  getReviews,
  addReview,
  deleteReview,
} from "../../controllers/review/reviewController.js";

// Middleware
import { auth } from "../../middleware/auth-middleware.js";

const router = express.Router();

router.get("/list", getReviews);

router.post("/add", auth, addReview);

router.post("/delete", auth, deleteReview);

export default router;
