import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { userRepository } from "../modules/user/index.js";

// Authorized - xác minh user là ai
const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw ApiError.unauthorized("No token provided");
  }

  // Lấy token từ header
  const refreshToken = authHeader.split(" ")[1];

  // Xác thực token
  const decoded = verifyAccessToken(refreshToken);
  if (!decoded) {
    throw ApiError.forbidden("Invalid token signature or tampered token");
  }
  // Lưu thông tin user vào request để sử dụng ở các middleware hoặc route tiếp theo
  req.user = decoded.id;

  next();
});

export default authMiddleware;
