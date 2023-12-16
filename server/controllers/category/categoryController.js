import asyncHandler from "express-async-handler";

// Model
import Category from "../../models/Category.js";

// * @desc - Get All Category
// * @route - GET /api/category/list
// * @access - Public
export const getAllCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  if (categories) {
    res.json(categories);
  } else {
    res.status(404);
    throw new Error("Categories not found");
  }
});

// * @desc - Get Category By Id
// * @route - GET /api/category/detail?id=:id
// * @access - Public
export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.query.id);

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});
