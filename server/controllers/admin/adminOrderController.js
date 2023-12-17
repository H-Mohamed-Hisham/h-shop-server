import asyncHandler from "express-async-handler";

// Model
import Order from "../../models/Order.js";

// * @desc - Get All Orders
// * @route - GET /api/admin/order/list
// * @access - Admin
export const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name");

    const ordersResponse = [];
    orders.forEach(function (item) {
      ordersResponse.push({
        ...item?._doc,
        customerName: item?.userId?.name,
      });
    });

    res.json(ordersResponse);
  } catch (error) {
    throw new Error(error);
  }
});

// * @desc - Get All Orders
// * @route - GET /api/admin/order/detail?id=:id
// * @access - Admin
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.query.id).populate(
    "userId",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
