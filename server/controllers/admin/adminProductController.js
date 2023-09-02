import asyncHandler from "express-async-handler";

// Model
import Product from "../../models/Product.js";

// Product Validator
import { validateProductInput } from "../../validators/productValidator.js";

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

// * @desc - Create Product
// * @route - POST /api/admin/product/create
// * @access - Admin
export const createProduct = asyncHandler(async (req, res) => {
  const { name, image, brand, categoryId, description, price, countInStock } =
    req.body;

  try {
    // Validate product data
    const { valid, inputError } = validateProductInput(
      name,
      image,
      brand,
      categoryId,
      description,
      price,
      countInStock
    );

    if (!valid) {
      return res.json({
        formInputError: inputError,
      });
    }

    const product = new Product({
      name,
      image,
      brand,
      categoryId,
      description,
      price,
      countInStock,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    throw new Error(error);
  }
});

// * @desc - Update Product
// * @route - PUT /api/admin/product/update
// * @access - Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    id,
    name,
    image,
    brand,
    categoryId,
    description,
    price,
    countInStock,
  } = req.body;

  try {
    // Validate product data
    const { valid, inputError } = validateProductInput(
      name,
      image,
      brand,
      categoryId,
      description,
      price,
      countInStock
    );

    if (!valid) {
      return res.json({
        formInputError: inputError,
      });
    }

    const product = await Product.findById(id);

    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.brand = brand;
      product.categoryId = categoryId;
      product.countInStock = countInStock;
      product.image = image;

      await product.save();

      res.status(201).json({ message: "Product updated successfully" });
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    throw new Error(error);
  }
});

// * @desc - Delete Product
// * @route - POST /api/admin/product/delete
// * @access - Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.body.id);
  if (product) {
    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } else {
    throw new Error("Product not found");
  }
});
