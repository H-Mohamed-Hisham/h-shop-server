import asyncHandler from "express-async-handler";
import pkg from "uuidv4";
import Stripe from "stripe";

// Model
import Product from "../../models/Product.js";
import Order from "../../models/Order.js";

const { uuid } = pkg;
const stripe = new Stripe(
  "sk_test_51HqwsgBrBOrRrnlyc69LWG9e8fTobnvkPflGi21vYFjEa0Mv1d1IKuOec9bGf8jRLrsFPYOzVqxUQ1LzyaPPbcU100FTu7IRP2"
);

// * @desc - Get All Products
// * @route - GET /api/order/checkout
// * @access - Private
export const checkout = asyncHandler(async (req, res) => {
  const { shippingAddress, paymentMethod, orderItems, totalAmount, token } =
    req.body;

  try {
    // Create Order Before Payment For Reference
    const newOrder = new Order({
      userId: req.user._id,
      shippingAddress,
      paymentMethod,
      orderItems,
      totalAmount,
      paymentRespone: {},
    });

    let createdOrder = await newOrder.save();
    // Order Id
    const orderId = createdOrder._id;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotencyKey = uuid();

    const charge = await stripe.charges.create(
      {
        amount: totalAmount * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchase`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotencyKey,
      }
    );

    // Update Order
    const updateOrder = await Order.findById(orderId);

    if (updateOrder) {
      updateOrder.paymentResponse = {
        id: charge.id,
        isPaid: true,
        status: charge.status,
        update_time: charge.created,
        email_address: charge.receipt_email,
        response: charge,
      };
    }

    await updateOrder.save();

    // Update Product Stock
    await Promise.all(
      orderItems.map(async (element) => {
        const product = await Product.findById(element.productId);
        if (product) {
          product.countInStock = product.countInStock - element.quantity;
          await product.save();
        }
      })
    );

    res.status(201).json({
      status: "success",
      message: "Order created successfully",
      data: {
        orderId,
      },
    });
  } catch (error) {
    res
      .status(201)
      .json({ status: "failure", message: "Order created successfully" });
  }
});

// * @desc - Get Logged In User Orders
// * @route - GET /api/order/my-orders
// * @access - Private
export const getMyOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate(
      "userId",
      "name"
    );

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

// * @desc - Get Logged In User Order By Id
// * @route - GET /api/order/my-order?id=:id
// * @access - Private
export const getMyOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findOne({
    userId: req.user._id,
    _id: req.query.id,
  }).populate("userId", "name email");

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
