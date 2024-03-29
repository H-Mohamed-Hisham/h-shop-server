import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// DB
import connectDB from "./config/db.js";

// Middleware
import { notFound, errorHandler } from "./middleware/error-middleware.js";

// Auth Route
import authRoute from "./routes/auth/authRoute.js";

// Product Route
import productRoute from "./routes/product/productRoute.js";

// Category Route
import categoryRoute from "./routes/category/categoryRoute.js";

// User Route
import userRoute from "./routes/user/userRoute.js";

// Cart Route
import cartRoute from "./routes/cart/cartRoute.js";

// Order Route
import orderRoute from "./routes/order/orderRoute.js";

// Review Route
import reviewRoute from "./routes/review/reviewRoute.js";

// Admin Route
import adminProductRoute from "./routes/admin/adminProductRoute.js";
import adminCategoryRoute from "./routes/admin/adminCategoryRoute.js";
import adminOrderRoute from "./routes/admin/adminOrderRoute.js";
import adminDashboardRoute from "./routes/admin/adminDashboardRoute.js";
import adminUserRoute from "./routes/admin/adminUserRoute.js";
import adminUploadRoute from "./routes/admin/adminUploadRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Port
const port = process.env.PORT || 5000;

// Auth Route
app.use("/api/auth", authRoute);

// Product Route
app.use("/api/product", productRoute);

// Category Route
app.use("/api/category", categoryRoute);

// User Route
app.use("/api/user", userRoute);

// Cart Route
app.use("/api/cart", cartRoute);

// Order Route
app.use("/api/order", orderRoute);

// Review Route
app.use("/api/review", reviewRoute);

// Admin Route
app.use("/api/admin/product", adminProductRoute);
app.use("/api/admin/category", adminCategoryRoute);
app.use("/api/admin/order", adminOrderRoute);
app.use("/api/admin/dashboard", adminDashboardRoute);
app.use("/api/admin/user", adminUserRoute);
app.use("/api/admin/upload", adminUploadRoute);

// Server Route
app.get("/", (req, res) => {
  res.send("H-Shop Server");
});

app.use(notFound);
app.use(errorHandler);

// Server Start
app.listen(port, async () => {
  connectDB();
  console.log(`⚡️[Server]: Server is running at http://localhost:${port}`);
});
