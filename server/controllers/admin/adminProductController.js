import asyncHandler from "express-async-handler";

// Model
import Product from "../../models/Product.js";

// * @desc - Get All Products
// * @route - GET /api/admin/product/list
// * @access - Admin
export const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().populate("categoryId", "name");

    res.json(products);
  } catch (error) {
    throw new Error(error);
  }
});
