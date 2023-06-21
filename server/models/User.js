import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAccountVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  role: {
    type: String,
    required: true,
    default: "customer",
  },
  createdAt: String,
  updatedAt: String,
});

const User = model("User", userSchema);

export default User;
