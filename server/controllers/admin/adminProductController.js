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

// * @desc - Create Product
// * @route - POST /api/admin/product/create
// * @access - Admin
export const createProduct = asyncHandler(async (req, res) => {
  const { name, image, brand, categoryId, description, price, countInStock } =
    req.body;

  // const product = new Product({
  //   name: 'PC',
  //   image:
  //     'https://res.cloudinary.com/hm-hisham/image/upload/v1633281724/MH-SHOP/Update_fyg1hq.jpg',
  //   brand: 'Sample Brand',
  //   categoryId: '60c8e7838e98474510f82e1f',
  //   description: 'Sample description',
  //   price: 100,
  //   user: req.user._id,
  //   countInStock: 1,
  // })

  const product = new Product({
    name,
    image,
    brand,
    categoryId,
    description,
    price,
    countInStock,
    user: req.user._id,
  });

  await product.save();
  res.status(201).json({ message: "Product created successfully" });
});
