import asyncHandler from "express-async-handler";

// Model
import User from "../../models/User.js";

// * @desc - Get All Users
// * @route - GET /api/admin/user/list
// * @access - Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    throw new Error(error);
  }
});
