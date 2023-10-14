import { model, Schema } from "mongoose";

const orderSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: false },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentResponse: {
    id: { type: String },
    status: { type: Boolean },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
    response: { type: Object },
  },
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
    default: 0.0,
  },
  isShipped: {
    type: Boolean,
    required: true,
    default: false,
  },
  shippedAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: String,
  updatedAt: String,
});

const Order = model("Order", orderSchema);

export default Order;
