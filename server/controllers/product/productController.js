import asyncHandler from "express-async-handler";

// Model
import Product from "../../models/Product.js";

// * @desc - Get All Products
// * @route - GET /api/product
// * @access - Public
export const getAllProducts = asyncHandler(async (req, res) => {
  const { pageNumber, productKeyword } = req.query;

  const productsPerPage = 2;
  const page = Number(pageNumber) || 1;

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
    .limit(productsPerPage)
    .skip(productsPerPage * (page - 1))
    .exec();

  res.json({
    products,
    page,
  });
});

// * @desc - Get Product By ID
// * @route - GET /api/product/:id
// * @access - Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "category",
    "name"
  );

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
