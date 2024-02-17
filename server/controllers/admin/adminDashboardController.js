import asyncHandler from "express-async-handler";
import dayjs from "dayjs";

// Model
import Category from "../../models/Category.js";
import Order from "../../models/Order.js";
import User from "../../models/User.js";

// * @desc - Get Product Stats
// * @route - GET /api/admin/dashboard/product-category-stats
// * @access - Admin
export const getProductCountByCategory = asyncHandler(async (req, res) => {
  try {
    const productCountByCategory = await Category.aggregate([
      {
        $lookup: {
          from: "products", // Replace with the actual name of the Product model's collection
          localField: "_id",
          foreignField: "categoryId",
          as: "products",
        },
      },
      {
        $addFields: {
          count: { $size: "$products" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          count: 1,
        },
      },
    ]);

    res.json(productCountByCategory);
  } catch (error) {
    throw new Error(error);
  }
});

// * @desc - Get Order Stats
// * @route - POST /api/admin/dashboard/order-stats
// * @access - Admin
export const getOrderCountFromSpecificDays = asyncHandler(async (req, res) => {
  try {
    const { days } = req.body;

    const currentDate = new Date();
    const dateArray = Array.from({ length: days }, (_, index) => {
      const date = new Date();
      date.setDate(currentDate.getDate() - index);
      return date.toISOString().split("T")[0];
    });

    const aggregationPipeline = [
      {
        $match: {
          createdAt: { $gte: new Date(dateArray[days - 1]), $lte: currentDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
    ];

    await Order.aggregate(aggregationPipeline)
      .then((result) => {
        // Create an object to store counts for each date
        const countsByDate = {};
        result.forEach(({ _id, count }) => {
          countsByDate[_id] = count;
        });

        // Create the final result array with counts for each day, including days with zero orders
        const finalResult = dateArray.map((dateString) => ({
          date: dayjs(dateString).format("DD-MM-YYYY"),
          count: countsByDate[dateString] || 0,
        }));

        res.json(finalResult);
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    throw new Error(error);
  }
});

// * @desc - Get User Stats
// * @route - POST /api/admin/dashboard/user-stats
// * @access - Admin
export const getUserCountFromSpecificMonths = asyncHandler(async (req, res) => {
  try {
    const { months } = req.body;

    const currentDate = new Date();
    const dateArray = Array.from({ length: months }, (_, index) => {
      const date = new Date();
      // date.setDate(1);
      date.setMonth(currentDate.getMonth() - index);
      return date.toISOString().split("T")[0];
    });

    const aggregationPipeline = [
      {
        $match: {
          createdAt: {
            $gte: new Date(dateArray[months - 1]),
            $lte: currentDate,
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
    ];

    await User.aggregate(aggregationPipeline)
      .then((result) => {
        let countsByDate = {};
        let finalResult = [];

        result.forEach(({ _id, count }) => {
          countsByDate[dayjs(_id).format("MM-YYYY")] = count;
        });

        finalResult = dateArray.map((dateString) => ({
          date: dayjs(dateString).format("MMM-YYYY"),
          count: countsByDate[dayjs(dateString).format("MM-YYYY")] || 0,
        }));

        res.json(finalResult);
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    throw new Error(error);
  }
});

// * @desc - Get Sales Stats
// * @route - POST /api/admin/dashboard/sales-stats
// * @access - Admin
export const getSalesStatFromSpecificMonths = asyncHandler(async (req, res) => {
  try {
    const { months } = req.body;

    const currentDate = new Date();
    const dateArray = Array.from({ length: months }, (_, index) => {
      const date = new Date();
      // date.setDate(1);
      date.setMonth(currentDate.getMonth() - index);
      return date.toISOString().split("T")[0];
    });

    const aggregationPipeline = [
      {
        $match: {
          createdAt: {
            $gte: new Date(dateArray[months - 1]),
            $lte: currentDate,
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          total_amount: { $sum: "$totalAmount" },
        },
      },
    ];

    await Order.aggregate(aggregationPipeline)
      .then((result) => {
        let countsByDate = {};
        let finalResult = [];

        result.forEach(({ _id, total_amount }) => {
          countsByDate[dayjs(_id).format("MM-YYYY")] = total_amount;
        });

        finalResult = dateArray.map((dateString) => ({
          date: dayjs(dateString).format("MMM-YYYY"),
          total_amount: countsByDate[dayjs(dateString).format("MM-YYYY")] || 0,
        }));

        res.json(finalResult);
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    throw new Error(error);
  }
});
