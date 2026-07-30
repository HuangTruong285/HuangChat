import ApiError from "../../utils/ApiError.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.js";

import { userMapper, userRepository } from "../user/index.js";
import refreshTokenRepository from "../refreshToken/refreshToken.repository.js";
import * as authMapper from "./auth.mapper.js";

// Hàm chuẩn hóa email: bỏ khoảng trắng, chuyển về chữ thường
const normalizeEmail = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

// Hàm chuẩn hóa username: bỏ khoảng trắng, chuyển về chữ thường
const normalizeUsername = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

// Hàm tạo thời gian hết hạn cho refresh token
const createRefreshTokenExpiresAt = () =>
  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

// Hàm tìm user bằng email hoặc username
const findUserByIdentifier = async (identifier, includePassword = false) => {
  const normalizedIdentifier = String(identifier || "")
    .trim()
    .toLowerCase();

  if (!normalizedIdentifier) return null;

  // Ưu tiên tìm theo email
  if (typeof userRepository.findUserByEmail === "function") {
    const userByEmail = await userRepository.findUserByEmail(
      normalizedIdentifier,
      includePassword,
    );
    if (userByEmail) return userByEmail;
  }

  // Nếu không tìm thấy, thử tìm theo username
  if (typeof userRepository.findUserByUsername === "function") {
    return userRepository.findUserByUsername(
      normalizedIdentifier,
      includePassword,
    );
  }

  return null;
};

// Đăng ký tài khoản mới
export const registerService = async ({ username, email, password }) => {
  const normalizedEmail = normalizeEmail(email);
  const normalizedUsername = normalizeUsername(username);

  if (!normalizedUsername) {
    throw ApiError.badRequest("Username is required");
  }

  if (!normalizedEmail) {
    throw ApiError.badRequest("Email is required");
  }

  if (!password) {
    throw ApiError.badRequest("Password is required");
  }

  // Kiểm tra email đã tồn tại chưa
  const existingUserByEmail =
    await userRepository.findUserByEmail(normalizedEmail);
  if (existingUserByEmail) {
    throw ApiError.conflict("Email already exists");
  }

  // Kiểm tra username đã tồn tại chưa
  const existingUserByUsername =
    await userRepository.findUserByUsername(normalizedUsername);
  if (existingUserByUsername) {
    throw ApiError.conflict("Username already exists");
  }

  // Tạo user mới
  const user = await userRepository.createUser({
    username: normalizedUsername,
    email: normalizedEmail,
    password,
  });

  // Tạo token mới
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Lưu refresh token vào DB qua repository
  await refreshTokenRepository.createOrReplaceRefreshToken(
    user._id,
    refreshToken,
    createRefreshTokenExpiresAt(),
  );

  return authMapper.toLoginResponse(user, accessToken, refreshToken);
};

// Đăng nhập
export const loginService = async ({ email, username, password }) => {
  const normalizedEmail = normalizeEmail(email);
  const normalizedUsername = normalizeUsername(username);

  if (!password) {
    throw ApiError.badRequest("Password is required");
  }

  if (!normalizedEmail && !normalizedUsername) {
    throw ApiError.badRequest("Please provide email or username");
  }

  // Tìm user bằng email hoặc username
  const user = await findUserByIdentifier(
    normalizedEmail || normalizedUsername,
    true,
  );

  if (!user) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  // So sánh mật khẩu
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  // Tạo token mới
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  await refreshTokenRepository.createOrReplaceRefreshToken(
    user._id,
    refreshToken,
    createRefreshTokenExpiresAt(),
  );

  return authMapper.toLoginResponse(user, accessToken, refreshToken);
};

// Làm mới access token bằng refresh token
export const refreshTokenService = async (refreshTokenValue) => {
  if (!refreshTokenValue) {
    throw ApiError.unauthorized("Refresh token is required");
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshTokenValue);
  } catch {
    throw ApiError.unauthorized("Invalid refresh token");
  }

  if (!decoded?.id) {
    throw ApiError.unauthorized("Invalid refresh token");
  }

  const user = await userRepository.findUserById(decoded.id);
  if (!user) {
    throw ApiError.notFound("User not found");
  }

  // Kiểm tra refresh token có còn hợp lệ trong DB không
  const tokenDoc = await refreshTokenRepository.findValidRefreshToken(
    refreshTokenValue,
  );
  if (!tokenDoc) {
    throw ApiError.unauthorized("Invalid refresh token");
  }

  if (tokenDoc.user?.toString() !== user._id.toString()) {
    throw ApiError.unauthorized("Invalid refresh token");
  }

  // Tạo access token và refresh token mới
  const newAccessToken = generateAccessToken(user._id);
  const newRefreshToken = generateRefreshToken(user._id);

  await refreshTokenRepository.createOrReplaceRefreshToken(
    user._id,
    newRefreshToken,
    createRefreshTokenExpiresAt(),
  );

  return authMapper.toLoginResponse(user, newAccessToken, newRefreshToken);
};

// Đăng xuất: thu hồi refresh token hiện tại
export const logoutService = async (refreshTokenValue) => {
  if (!refreshTokenValue) return;

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshTokenValue);
  } catch {
    return;
  }

  if (!decoded?.id) return;

  const tokenDoc = await refreshTokenRepository.findValidRefreshToken(
    refreshTokenValue,
  );
  if (!tokenDoc) return;

  await refreshTokenRepository.revokeRefreshToken(tokenDoc);
};

// Lấy thông tin user hiện tại
export const getMeService = async (userId) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return userMapper.toUserResponse(user);
};
