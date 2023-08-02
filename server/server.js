import express from "express";
import dotenv from "dotenv";
import cors from 'cors'

// DB
import connectDB from "./config/db.js";

// Middleware
import { notFound, errorHandler } from "./middleware/error-middleware.js";

// Product Route
import productRoute from "./routes/product/productRoute.js";

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

app.use("/api/product", productRoute);

app.get("/", (req, res) => {
  res.send("H-Shop Server");
});

app.use(notFound);
app.use(errorHandler);

// Port
const port = process.env.PORT || 5000;

// Server Start
app.listen(port, async () => {
  connectDB();
  console.log(`⚡️[Server]: Server is running at http://localhost:${port}`);
});
