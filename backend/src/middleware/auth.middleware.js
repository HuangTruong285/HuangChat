import ApiError from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/jwt.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  const header = req.headers.authorization;

  if (header && header.startsWith("Bearer ")) {
    token = header.split(" ")[1];
  }

  if (!token) {
    throw ApiError.unauthorized("Not authorized, no token provided");
  }

  let decoded;
  try {
    decoded = verifyAccessToken(token);
  } catch {
    throw ApiError.unauthorized("Not, authorized, token invalid or expired");
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw ApiError.unauthorized("Not authorized, user no longer exists");
  }

  req.user = user;
  next();
});
