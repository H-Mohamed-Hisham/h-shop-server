import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

// Model
import User from "../../models/User.js";

// User Validator
import {
  //   validateSignupInput,
  validateSigninInput,
} from "../../validators/userValidator.js";

// Helpers
import { generateToken } from "../../helpers/generateToken.js";

// * @desc - Sign In (Auth user & get token)
// * @route - POST /api/user/signin
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

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    // return res.json({
    //   error: "Invalid email or password",
    // });
    throw new Error("Invalid email or password");
  }

  if (user && user.isAccountVerified) {
    res.json({
      token: generateToken(user._id, user.name, user.role),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } else {
    // return res.json({
    //   error: "Email has been not verified",
    // });
    throw new Error("Email has been not verified");
  }
});

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
