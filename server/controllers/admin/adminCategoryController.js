import asyncHandler from "express-async-handler";

// Model
import Category from "../../models/Category.js";

// Category Validator
import { validateCategoryInput } from "../../validators/categoryValidator.js";

// * @desc - Create Category
// * @route - POST /api/admin/category/create
// * @access - Admin
export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Validate category data
  const { valid, inputError } = validateCategoryInput(name);

  if (!valid) {
    return res.json({
      formInputError: inputError,
    });
  }

  const category = new Category({
    name,
  });

  await category.save();
  res.status(201).json({ message: "Category created successfully" });
});

// * @desc - Update Category
// * @route - PUT /api/admin/category/update
// * @access - Admin
export const updateCategory = asyncHandler(async (req, res) => {
  const { name, id } = req.body;

  // Validate category data
  const { valid, inputError } = validateCategoryInput(name);

  if (!valid) {
    return res.json({
      formInputError: inputError,
    });
  }

  const category = await Category.findById(id);

  if (category) {
    category.name = name;

    await category.save();
    res.json({
      message: "Category updated successfully",
    });
  } else {
    throw new Error("Category not found");
  }
});

// * @desc - Delete Category
// * @route - POST /api/admin/category/delete
// * @access - Admin
export const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.body;

  try {
    await Category.deleteMany({ _id: { $in: categoryId } });
    res.json({
      message: `${
        categoryId.length > 1 ? "Categories" : "Category"
      } deleted successfully`,
    });
  } catch (error) {
    throw new Error("Something went wrong, Delete process failed");
  }
});
