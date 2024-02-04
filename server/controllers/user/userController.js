import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

// Model
import User from "../../models/User.js";

// User Validator
import { validateChangePasswordInput } from "../../validators/userValidator.js";

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

// * @desc - Change Password
// * @route - GET /api/user/change-password
// * access - Private
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  // Validate change password data
  const { valid, inputError } = validateChangePasswordInput(
    currentPassword,
    newPassword,
    confirmNewPassword
  );

  if (!valid) {
    return res.json({
      formInputError: inputError,
    });
  }

  const user = await User.findById(req.user._id);
  const match = await bcrypt.compare(currentPassword, user.password);

  if (user) {
    if (match) {
      user.password = newPassword;

      await user.save();

      res.json({
        message: "Password updated successfully",
      });
    } else {
      throw new Error("Invalid current password");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
