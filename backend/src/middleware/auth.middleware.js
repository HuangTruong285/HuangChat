import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/jwt.js";

// ============================== XÁC THỰC ==============================
// Xác thực người dùng
const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Kiểm tra Authorization header
  if (!authHeader?.startsWith("Bearer ")) {
    throw ApiError.unauthorized("No access token provided");
  }

  // Lấy Access Token
  const accessToken = authHeader.split(" ")[1];

  // Xác thực Access Token
  const decoded = verifyAccessToken(accessToken);

  // Lưu thông tin người dùng để các middleware/controller phía sau sử dụng
  req.user = {
    id: decoded.id,
  };

  next();
});

export default authMiddleware;
