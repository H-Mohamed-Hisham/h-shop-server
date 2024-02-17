import asyncHandler from "express-async-handler";

// Review Validator
import { validateReviewInput } from "../../validators/reviewValidator.js";

// Model
import Review from "../../models/Review.js";
import Product from "../../models/Product.js";

// * @desc - Get Reviews By Product ID
// * @route - GET /api/review/list
// * @access - Public
export const getReviews = asyncHandler(async (req, res) => {
  const { productId } = req.query;

  try {
    const reviews = await Review.find({ productId: productId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    throw new Error(error);
  }
});

// * @desc - Add Review
// * @route - POST /api/review/add
// * access - Private
export const addReview = asyncHandler(async (req, res) => {
  const { productId, rating, comment } = req.body;
  const userId = req.user._id;

  try {
    const isAlreadyReviewed = await Review.find({
      userId: userId,
      productId: productId,
    });
    let review = await Review.find({ productId: productId });
    const product = await Product.findById(productId);

    if (isAlreadyReviewed.length > 0) {
      throw new Error("Product is already reviewed by yourself");
    } else {
      // Validate review data
      const { valid, inputError } = validateReviewInput(rating, comment);

      if (!valid) {
        return res.json({
          formInputError: inputError,
        });
      }

      const newReview = new Review({
        productId,
        userId,
        rating: Number(rating),
        comment,
      });

      await newReview.save();

      review = await Review.find({ productId: productId });

      product.reviewsCount = review.length;
      product.rating = Number(
        review.reduce((acc, item) => item.rating + acc, 0) / review.length
      );
      await product.save();

      res.json({
        message: "Review added successfully",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// * @desc - Delete Review
// * @route - POST /api/review/delete
// * access - Private
export const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId, productId } = req.body;
  const userId = req.user._id;

  try {
    let review = await Review.find({ _id: reviewId, userId: userId });
    const product = await Product.findById(productId);

    if (review) {
      await review[0].deleteOne();

      let updatedReview = await Review.find({ productId: productId });

      product.reviewsCount =
        updatedReview.length === 0 ? 0 : updatedReview.length;
      product.rating =
        updatedReview.length === 0
          ? 0
          : Number(
              updatedReview.reduce((acc, item) => item.rating + acc, 0) /
                updatedReview.length
            );

      await product.save();

      res.json({
        message: "Review deleted succesfully",
      });
    } else {
      throw new Error("Review Not Found");
    }
  } catch (error) {
    throw new Error(error);
  }
});
