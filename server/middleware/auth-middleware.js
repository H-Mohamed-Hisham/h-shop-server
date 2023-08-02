import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

// Model
import User from "../models/User.js";

export const auth = asyncHandler(async (req, res, next) => {
  let authToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      authToken = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(authToken, `${process.env.JWT_SECRET}`);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, Token failed / Token expired");
    }
  }

  if (!authToken) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as an Admin");
  }
});
