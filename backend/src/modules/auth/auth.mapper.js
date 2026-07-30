import { userMapper } from "../user/index.js";

// Chuyển dữ liệu user + token thành response cho client
export const toLoginResponse = (user, accessToken, refreshToken) => ({
  accessToken,
  refreshToken,
  tokenType: "Bearer",
  user: userMapper.toUserResponse(user),
});

// Alias cho dễ dùng
export const toAuthResponse = (user, accessToken, refreshToken) =>
  toLoginResponse(user, accessToken, refreshToken);
