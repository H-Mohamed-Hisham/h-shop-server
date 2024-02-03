import { model, Schema } from "mongoose";

// Model
import User from "./User.js";
import Product from "./Product.js";

const reviewSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: Product.modelName,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: User.modelName,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);

export default Review;
