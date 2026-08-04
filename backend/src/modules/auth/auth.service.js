import ApiError from "../../utils/ApiError.js";
import { generateAccessToken } from "../../utils/jwt.js";
import { hashPassword, comparePassword } from "../../utils/password.js";
import {
  generateRefreshToken,
  hashRefreshToken,
} from "../../utils/refreshToken.js";

import { userRepository } from "../user/index.js";
import { sessionRepository } from "../session/index.js";

// Hằng số thời gian sống của Refresh Token (7 ngày)
const REFRESH_TOKEN_TTL = 7 * 24 * 60 * 60 * 1000;

// Helper xóa dữ liệu nhạy cảm (hashedPassword) trước khi return
const sanitizeUser = (user) => {
  const userObj = user.toObject ? user.toObject() : { ...user };
  delete userObj.hashedPassword;
  return userObj;
};

// ============================== REGISTER ==============================
export const register = async ({ username, email, password }) => {
  // Kiểm tra username & email song song để tối ưu tốc độ
  const [existingUserName, existingUserEmail] = await Promise.all([
    userRepository.existsByUsername(username),
    userRepository.existsByEmail(email),
  ]);

  if (existingUserName) {
    throw ApiError.conflict("Username already exists");
  }
  if (existingUserEmail) {
    throw ApiError.conflict("Email already exists");
  }

  // Mã hoá mật khẩu
  const hashedPassword = await hashPassword(password);

  // Tạo user mới
  const user = await userRepository.create({
    username,
    email,
    hashedPassword,
    displayName: username,
  });

  // Access Token
  const accessToken = generateAccessToken(user._id);

  // Refresh Token
  const refreshToken = generateRefreshToken();
  const hashedRefreshToken = await hashRefreshToken(refreshToken);

  // Lưu Refresh Token vào DB
  await sessionRepository.create({
    userId: user._id,
    hashedRefreshToken,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
  });

  return {
    user,
    accessToken,
    refreshToken,
  };
};

// ============================== LOGIN ==============================
export const login = async ({ identifier, password }) => {
  // Tìm user theo username hoặc email
  const user = await userRepository.findByIdentifier(identifier);
  if (!user) {
    throw ApiError.unauthorized("Invalid username or password");
  }

  // So sánh mật khẩu
  const isMatch = await comparePassword(password, user.hashedPassword);
  if (!isMatch) {
    throw ApiError.unauthorized("Invalid username or password");
  }

  // Access Token
  const accessToken = generateAccessToken(user._id);

  // Refresh Token
  const refreshToken = generateRefreshToken();
  const hashedRefreshToken = await hashRefreshToken(refreshToken);

  // Lưu Refresh Token vào DB
  await sessionRepository.create({
    userId: user._id,
    hashedRefreshToken,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
  });

  return {
    user: sanitizeUser(user),
    accessToken,
    refreshToken,
  };
};

// ============================== REFRESH ==============================
export const refresh = async (refreshToken) => {
  // Hash Refresh Token trước khi tìm kiếm trong DB
  const hashedRefreshToken = await hashRefreshToken(refreshToken);

  // Tìm Refresh Token trong DB
  const session = await sessionRepository.findByToken(hashedRefreshToken);

  // Nếu không tìm thấy hoặc Refresh Token đã bị thu hồi, trả về lỗi
  if (!session || session.revoked) {
    throw ApiError.unauthorized("Invalid refresh token");
  }

  // Nếu Refresh Token đã hết hạn, trả về lỗi
  if (session.expiresAt < new Date()) {
    throw ApiError.unauthorized("Refresh token has expired");
  }

  // Rotation: xoá Refresh Token cũ
  await sessionRepository.deleteByToken(hashedRefreshToken);
  // Tạo Refresh Token mới
  const newRefreshToken = generateRefreshToken();
  // Lưu Refresh Token mới vào DB
  const hashedNewRefreshToken = await hashRefreshToken(newRefreshToken);
  await sessionRepository.create({
    userId: session.user,
    hashedRefreshToken: hashedNewRefreshToken,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
  });

  // Tao Access Token mới
  const newAccessToken = generateAccessToken(session.user);

  // Trả về response với Access Token mới
  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

// ============================== LOGOUT ==============================
export const logout = async (refreshToken) => {
  // Hash Refresh Token trước khi tìm kiếm trong DB
  const hashedRefreshToken = await hashRefreshToken(refreshToken);

  // Xoá Refresh Token khỏi DB
  await sessionRepository.deleteByToken(hashedRefreshToken);
};
