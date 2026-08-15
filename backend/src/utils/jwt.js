import jwt from "jsonwebtoken";
import env from "../config/env.js";

// Tạo Access Token
export const generateAccessToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
    },
    env.jwt.accessSecret,
    {
      expiresIn: env.jwt.accessExpiresIn,
    },
  );
};

// Xác thực Access Token
export const verifyAccessToken = (token) => {
  return jwt.verify(token, env.jwt.accessSecret);
};
