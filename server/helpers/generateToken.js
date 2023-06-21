import jwt from "jsonwebtoken";

export const generateToken = (id, name, role) => {
  return jwt.sign({ id, name, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
