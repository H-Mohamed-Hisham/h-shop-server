import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// DB
import connectDB from "./config/db.js";

// Middleware
import { notFound, errorHandler } from "./middleware/error-middleware.js";

// Product Route
import productRoute from "./routes/product/productRoute.js";

// User Route
import userRoute from "./routes/user/userRoute.js";

// Cart Route
import cartRoute from "./routes/cart/cartRoute.js";

// Admin Route
import adminProductRoute from "./routes/admin/adminProductRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors());

// Port
const port = process.env.PORT || 5000;

// Product Route
app.use("/api/product", productRoute);

// User Route
app.use("/api/user", userRoute);

// Cart Route
app.use("/api/cart", cartRoute);

// Admin Route
app.use("/api/admin/product", adminProductRoute);

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
