import asyncHandler from "express-async-handler";

// * Model
import Product from "../../models/Product.js";

// * @desc - Get Cart Products
// * @route - POST /api/cart/list
// * @access - Public
export const getCartProducts = asyncHandler(async (req, res) => {
  const { productIds } = req.body;

  try {
    const cartProduct = await Product.find({
      _id: {
        $in: productIds,
      },
    }).select("name image price _id countInStock");

    if (cartProduct) {
      res.json(cartProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    throw new Error(error);
  }
});
