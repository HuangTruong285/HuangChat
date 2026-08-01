import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/jwt.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw ApiError.unauthorized("No token provided");
  }

  // Lấy token từ header
  const accessToken = authHeader.split(" ")[1];

  // Xác thực token
  const decoded = verifyAccessToken(accessToken);

  // Lưu thông tin user vào request để sử dụng ở các middleware hoặc route tiếp theo
  req.user = { id: decoded.id };

  next();
});

export default authMiddleware;
