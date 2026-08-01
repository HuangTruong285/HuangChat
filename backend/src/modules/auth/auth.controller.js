import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import {
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
} from "../../utils/cookie.js";

import authService from "./auth.service.js";

// Controller đăng ký tài khoản
export const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);

  setRefreshTokenCookie(res, result.refreshToken);

  return ApiResponse.created(res, "User registered successfully", result);
});

// Controller đăng nhập
export const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  setRefreshTokenCookie(res, result.refreshToken);

  return ApiResponse.ok(res, "User logged in successfully", result);
});

// Controller làm mới access token bằng refresh token
export const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw ApiError.unauthorized("Refresh token is required");
  }

  const result = await authService.refresh(refreshToken);

  setRefreshTokenCookie(res, result.refreshToken);

  return ApiResponse.ok(res, "Access token refreshed successfully", result);
});

// Controller đăng xuất
export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw ApiError.unauthorized("Refresh token is required");
  }

  await authService.logout(refreshToken);

  clearRefreshTokenCookie(res);

  return ApiResponse.ok(res, "Logout successfully");
});

export default {
  register,
  login,
  refresh,
  logout,
};
