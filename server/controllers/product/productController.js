import asyncHandler from "express-async-handler";

// Model
import Product from "../../models/Product.js";

// * @desc - Get All Products
// * @route - GET /api/product
// * @access - Public
export const getAllProducts = asyncHandler(async (req, res) => {
  const { skip, limit, productKeyword } = req.query;

  try {
    const _skip = Number(skip) || 1;

    const keyword = productKeyword
      ? {
          name: {
            $regex: productKeyword,
            $options: "i",
          },
        }
      : {};

    const products = await Product.find({ ...keyword })
      .populate("categoryId", "name")
      .limit(limit)
      .skip(limit * (_skip - 1));

    const productCount = await Product.countDocuments({ ...keyword });

    res.json({
      products,
      productCount: productCount,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// * @desc - Get Product By ID
// * @route - GET /api/product/:id
// * @access - Public
export const getProductById = asyncHandler(async (req, res) => {
  // const product = await Product.findById(req.query.id).populate(
  //   "category",
  //   "name"
  // );

  const product = await Product.findById(req.query.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// * @desc - Get top rated products
// * @route - GET /api/product/top
// * @access - Public
export const getTopRatedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    // .sort({ rating: -1 })
    .limit(3);

  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
