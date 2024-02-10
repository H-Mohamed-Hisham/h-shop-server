import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

// Model
import User from "../../models/User.js";

// User Validator
import {
  validateChangePasswordInput,
  validateUpdateProfileInput,
} from "../../validators/userValidator.js";

// Helpers
import { generateToken } from "../../helpers/generateToken.js";

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

// * @desc - Update Profile
// * @route - GET /api/user/update-profile
// * access - Private
export const updateProfile = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Validate update profile data
  const { valid, inputError } = validateUpdateProfileInput(name);

  if (!valid) {
    return res.json({
      formInputError: inputError,
    });
  }

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = name;
    await user.save();
    res.json({
      token: generateToken(
        user._id,
        user.name,
        user.role,
        user.email,
        user.createdAt,
        user.updatedAt
      ),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      message: "Profile updated successfully",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
