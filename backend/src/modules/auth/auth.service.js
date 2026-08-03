import ApiError from "../../utils/ApiError.js";
import { generateAccessToken } from "../../utils/jwt.js";
import { hashPassword, comparePassword } from "../../utils/password.js";
import {
  generateRefreshToken,
  hashRefreshToken,
} from "../../utils/refreshToken.js";

import { userMapper, userRepository } from "../user/index.js";
import { refreshTokenRepository } from "../refreshToken/index.js";
import authMapper from "./auth.mapper.js";

// Đăng ký tài khoản mới
export const register = async ({ username, email, password }) => {
  // Kiểm tra username đã tồn tại chưa
  const existingUserName = await userRepository.existsByUsername(username);
  if (existingUserName) {
    throw ApiError.conflict("Username already exists");
  }

  // Kiểm tra email đã tồn tại chưa
  const existingUserEmail = await userRepository.existsByEmail(email);
  if (existingUserEmail) {
    throw ApiError.conflict("Email already exists");
  }

  // Mã hoá mật khẩu
  const hashedPassword = await hashPassword(password);

  // Tạo user mới
  const user = await userRepository.create({
    username,
    email,
    password: hashedPassword,
  });

  // Tạo Access Token
  const accessToken = generateAccessToken(user._id);

  // Tạo Refresh Token
  const refreshToken = generateRefreshToken();

  // Hash Refresh Token trước khi lưu vào DB
  const hashedRefreshToken = await hashRefreshToken(refreshToken);

  // Lưu Refresh Token vào DB
  await refreshTokenRepository.create({
    user: user._id,
    token: hashedRefreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 ngày
  });

  return authMapper.toAuthResponse(user, accessToken, refreshToken);
};

export const login = async ({ identifier, password }) => {
  // Tìm user theo username hoặc email
  const user = await userRepository.findByIdentifier(identifier);
  if (!user) {
    throw ApiError.unauthorized("Invalid username or password");
  }

  // So sánh mật khẩu
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw ApiError.unauthorized("Invalid username or password");
  }

  // Tạo Access Token
  const accessToken = generateAccessToken(user._id);

  // Tạo Refresh Token
  const refreshToken = generateRefreshToken();

  // Hash Refresh Token trước khi lưu vào DB
  const hashedRefreshToken = await hashRefreshToken(refreshToken);

  // Lưu Refresh Token vào DB
  await refreshTokenRepository.create({
    user: user._id,
    token: hashedRefreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 ngày
  });

  return authMapper.toAuthResponse(user, accessToken, refreshToken);
};

export const refresh = async (refreshToken) => {
  // Hash Refresh Token trước khi tìm kiếm trong DB
  const hashedRefreshToken = await hashRefreshToken(refreshToken);

  // Tìm Refresh Token trong DB
  const storedRefreshToken =
    await refreshTokenRepository.findByToken(hashedRefreshToken);

  // Nếu không tìm thấy hoặc Refresh Token đã bị thu hồi, trả về lỗi
  if (!storedRefreshToken || storedRefreshToken.revoked) {
    throw ApiError.unauthorized("Invalid refresh token");
  }

  // Nếu Refresh Token đã hết hạn, trả về lỗi
  if (storedRefreshToken.expiresAt < new Date()) {
    throw ApiError.unauthorized("Refresh token has expired");
  }

  // Rotation: xoá Refresh Token cũ
  await refreshTokenRepository.deleteByToken(hashedRefreshToken);

  // Tạo Refresh Token mới
  const newRefreshToken = generateRefreshToken();

  // Lưu Refresh Token mới vào DB
  const hashedNewRefreshToken = await hashRefreshToken(newRefreshToken);
  await refreshTokenRepository.create({
    user: storedRefreshToken.user,
    token: hashedNewRefreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 ngày
  });

  // Tao Access Token mới
  const newAccessToken = generateAccessToken(storedRefreshToken.user);

  // Trả về response với Access Token mới
  return authMapper.toRefreshResponse(newAccessToken, newRefreshToken);
};

export const logout = async (refreshToken) => {
  // Hash Refresh Token trước khi tìm kiếm trong DB
  const hashedRefreshToken = await hashRefreshToken(refreshToken);

  // Tìm Refresh Token trong DB
  const storedRefreshToken =
    await refreshTokenRepository.findByToken(hashedRefreshToken);

  // Nếu không tìm thấy hoặc Refresh Token đã bị thu hồi, trả về lỗi
  if (!storedRefreshToken || storedRefreshToken.revoked) {
    throw ApiError.unauthorized("Invalid refresh token");
  }

  // Xoá Refresh Token khỏi DB
  await refreshTokenRepository.deleteByToken(hashedRefreshToken);
};

export const getMe = async (userId) => {
  // Tìm user
  const user = await userRepository.findById(userId);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return userMapper.toUserResponse(user);
};

export default {
  register,
  login,
  refresh,
  logout,
  getMe,
};
