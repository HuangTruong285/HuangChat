import RefreshToken from "./refreshToken.model.js";

/**
 * Repository cho refresh token.
 *
 * Dùng để tách logic truy cập DB khỏi service.
 *
 * Các method chính:
 * - createRefreshToken(userId, rawToken, expiresAt): lưu token mới
 * - createOrReplaceRefreshToken(userId, rawToken, expiresAt): tạo token mới và thu hồi token cũ
 * - findValidRefreshToken(rawToken): tìm token còn hợp lệ
 * - revokeRefreshToken(tokenDoc): thu hồi một token cụ thể
 * - revokeAllForUser(userId): thu hồi tất cả token đang hoạt động của user
 */

// Tạo mới một refresh token cho user
export const createRefreshToken = async (userId, rawToken, expiresAt) => {
  return RefreshToken.createForUser(userId, rawToken, expiresAt);
};

// Tạo token mới và thu hồi token cũ của cùng user
export const createOrReplaceRefreshToken = async (
  userId,
  rawToken,
  expiresAt,
) => {
  return RefreshToken.createOrReplaceForUser(userId, rawToken, expiresAt);
};

// Tìm token còn hợp lệ trong DB
export const findValidRefreshToken = async (rawToken) => {
  return RefreshToken.findValidToken(rawToken);
};

// Thu hồi một token cụ thể
export const revokeRefreshToken = async (tokenDoc) => {
  if (!tokenDoc) return null;

  return tokenDoc.revoke();
};

// Thu hồi tất cả token đang hoạt động của user
export const revokeAllForUser = async (userId) => {
  return RefreshToken.updateMany(
    { user: userId, revoked: false },
    { $set: { revoked: true } },
  );
};

export default {
  createRefreshToken,
  createOrReplaceRefreshToken,
  findValidRefreshToken,
  revokeRefreshToken,
  revokeAllForUser,
};
