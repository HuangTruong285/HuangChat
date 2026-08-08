import ApiError from "../../utils/ApiError.js";
import { generateAccessToken } from "../../utils/jwt.js";
import { hashPassword, comparePassword } from "../../utils/password.js";
import {
  generateRefreshToken,
  hashRefreshToken,
} from "../../utils/refreshToken.js";

import { userRepository } from "../user/index.js";
import { sessionRepository } from "../session/index.js";

// ============================== CONSTANT ==============================
// Hằng số thời gian sống của Refresh Token (7 ngày)
const REFRESH_TOKEN_TTL = 7 * 24 * 60 * 60 * 1000;

// ============================== PRIVATE HELPER ==============================
// Tạo access token + refresh token + session
const createSession = async (userId) => {
  const accessToken = generateAccessToken(userId);

  const refreshToken = generateRefreshToken();
  const tokenHash = await hashRefreshToken(refreshToken);

  await sessionRepository.create({
    userId,
    tokenHash,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
  });

  return {
    accessToken,
    refreshToken,
  };
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

  return createSession(user._id);
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

  return createSession(user._id);
};

// ============================== REFRESH ==============================
export const refresh = async (refreshToken) => {
  // Hash Refresh Token trước khi tìm kiếm trong DB
  const tokenHash = await hashRefreshToken(refreshToken);

  // Tìm Refresh Token trong DB
  const session = await sessionRepository.findByTokenHash(tokenHash);

  // Nếu không tìm thấy hoặc Refresh Token đã bị thu hồi, trả về lỗi
  if (!session || session.revoked) {
    throw ApiError.unauthorized("Invalid refresh token");
  }

  // Nếu Refresh Token đã hết hạn, trả về lỗi
  if (session.expiresAt < new Date()) {
    throw ApiError.unauthorized("Refresh token has expired");
  }

  // Vô hiệu hoá Refresh Token cũ (Rotation)
  await sessionRepository.revokeByTokenHash(tokenHash);
  return createSession(session.userId);
};

// ============================== LOGOUT ==============================
export const logout = async (refreshToken) => {
  // Hash Refresh Token trước khi tìm kiếm trong DB
  const tokenHash = await hashRefreshToken(refreshToken);

  // Vô hiệu hoá Refresh Token
  await sessionRepository.revokeByTokenHash(tokenHash);
};
