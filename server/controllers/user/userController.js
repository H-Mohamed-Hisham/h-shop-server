import asyncHandler from "express-async-handler";

// Model
import User from "../../models/User.js";

// * @desc - Get user profile
// * @route - GET /api/user/profile
// * access - Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -isAccountVerified"
  );

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
