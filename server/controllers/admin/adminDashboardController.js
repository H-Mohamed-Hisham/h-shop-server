import asyncHandler from "express-async-handler";

// Model
import Category from "../../models/Category.js";
import Product from "../../models/Product.js";

// * @desc - Get Product Stats
// * @route - GET /api/admin/dashboard/product-category/stats
// * @access - Admin
export const getProductCountByCategory = asyncHandler(async (req, res) => {
  try {
    const productCountByCategory = await Product.aggregate([
      {
        $lookup: {
          from: "categories", // Use the actual name of the Category model's collection
          localField: "categoryId",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: "$categoryInfo",
      },
      {
        $group: {
          _id: "$categoryInfo.name",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          name: "$_id", // Rename _id to name
          count: 1,
        },
      },
    ]);

    res.json(productCountByCategory);
  } catch (error) {
    throw new Error(error);
  }
});
