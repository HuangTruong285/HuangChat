import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/jwt.js";
import * as userRepository from "../modules/user/user.repository.js";

// Hàm lấy access token từ header Authorization hoặc từ cookie
const getAccessTokenFromRequest = (req) => {
  // Hỗ trợ format: Authorization: Bearer <token>
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  // Hỗ trợ trường hợp token được gửi trong cookie
  if (req.cookies?.accessToken) {
    return req.cookies.accessToken;
  }

  return null;
};

// Middleware kiểm tra người dùng đã đăng nhập chưa
export const protect = asyncHandler(async (req, res, next) => {
  const token = getAccessTokenFromRequest(req);

  if (!token) {
    throw ApiError.unauthorized("Not authorized, no token provided");
  }

  let decoded;
  try {
    // Giải mã token để lấy thông tin user
    decoded = verifyAccessToken(token);
  } catch {
    throw ApiError.unauthorized("Not authorized, token invalid or expired");
  }

  // Token phải có id người dùng
  if (!decoded?.id) {
    throw ApiError.unauthorized("Not authorized, token payload is invalid");
  }

  // Tìm user trong database
  const user = await userRepository.findUserById(decoded.id);

  if (!user) {
    throw ApiError.unauthorized("Not authorized, user no longer exists");
  }

  // Gắn thông tin user vào request để các controller sau dùng
  req.user = user;
  req.userId = user._id || user.id;

  next();
});
