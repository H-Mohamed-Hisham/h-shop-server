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

// * @desc - Get Order By ID
// * @route - GET /api/admin/order/detail?id=:id
// * @access - Admin
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.query.id)
    .populate("userId", "name email")
    .populate("orderItems.productId", "image");

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// * @desc - Update Order Status By Id
// * @route - PUT /api/admin/order/update-status
// * @access - Admin
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId, type, value } = req.body;
  const order = await Order.findById(orderId);

  if (order) {
    if (type === "isShipped" && value === false) {
      order[type] = value;
      order.isDelivered = false;
    } else {
      order[type] = value;
    }

    await order.save();
    res.json({
      message: "Status updated succesfully",
    });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
