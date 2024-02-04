import jwt from "jsonwebtoken";

export const generateToken = (id, name, role, email, createdAt, updatedAt) => {
  return jwt.sign(
    { id, name, role, email, createdAt, updatedAt },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};
