import asyncHandler from "express-async-handler";

// Model
import User from "../../models/User.js";

// User Validator
import {
  validateSignupInput,
  validateSigninInput,
} from "../../validators/userValidator.js";

// Helpers
import { generateToken } from "../../helpers/generateToken.js";

// * @desc - Sign In (Auth user & get token)
// * @route - POST /api/auth/signin
// * @access - Public
export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate user signup data
  const { valid, inputError } = validateSigninInput(email, password);

  if (!valid) {
    return res.json({
      formInputError: inputError,
    });
  }

  const user = await User.findOne({ email });

  const match = await user.matchPassword(password);

  if (!match) {
    throw new Error("Invalid email or password");
  }

  if (user && user.isAccountVerified) {
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
    });
  } else {
    throw new Error("Email has been not verified");
  }
});

// * @desc - Sign Up
// * @route - POST /api/auth/signup
// * @access - Public
export const signup = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validate user signup data
  const { valid, inputError } = validateSignupInput(
    name,
    email,
    password,
    confirmPassword
  );
  if (!valid) {
    return res.json({
      inputError,
    });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("Email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    isAccountVerified: true,
    role: "Customer",
  });

  if (user && user.isAccountVerified) {
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
      message: `Your account has been created successfully`,
    });
  } else {
    throw new Error("Something went wrong, Please try again.");
  }
});
