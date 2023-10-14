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
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      orderItems,
      totalAmount,
    });

    createdOrder = await newOrder.save();
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
      updateOrder.paymentResult = {
        id: charge.id,
        isPaid: true,
        status: charge.status,
        update_time: charge.created,
        email_address: charge.receipt_email,
      };
    }

    await updateOrder.save();

    // Update Product Stock
    await Promise.all(
      orderItems.map(async (element) => {
        const product = await Product.findById(element._id);
        if (product) {
          product.countInStock = product.countInStock - element.quantity;
          await product.save();
        }
      })
    );

    res
      .status(201)
      .json({ status: "success", message: "Order created successfully" });
  } catch (error) {
    console.log("err :: ", error);
    res
      .status(201)
      .json({ status: "failure", message: "Order created successfully" });
  }
});
