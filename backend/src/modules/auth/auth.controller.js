import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

import * as authService from "./auth.service.js";

// Hàm nhỏ giúp lấy refresh token từ body hoặc từ cookie
const getRefreshTokenFromRequest = (req) => {
  return req.body?.refreshToken || req.cookies?.refreshToken || null;
};

// Hàm set refresh token vào cookie
const setRefreshTokenCookie = (res, refreshToken) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
  });
};

// Controller đăng ký tài khoản
export const registerController = asyncHandler(async (req, res) => {
  const data = await authService.registerService(req.body);

  setRefreshTokenCookie(res, data.refreshToken);

  return ApiResponse.created(res, "Register successfully", data);
});

// Controller đăng nhập
export const loginController = asyncHandler(async (req, res) => {
  const data = await authService.loginService(req.body);

  setRefreshTokenCookie(res, data.refreshToken);

  return ApiResponse.ok(res, "Login successfully", data);
});

// Controller làm mới access token bằng refresh token
export const refreshTokenController = asyncHandler(async (req, res) => {
  const refreshToken = getRefreshTokenFromRequest(req);

  if (!refreshToken) {
    throw ApiError.unauthorized("Refresh token is required");
  }

  const data = await authService.refreshTokenService(refreshToken);

  setRefreshTokenCookie(res, data.refreshToken);

  return ApiResponse.ok(res, "Token refreshed successfully", data);
});

// Controller đăng xuất
export const logoutController = asyncHandler(async (req, res) => {
  const refreshToken = getRefreshTokenFromRequest(req);

  if (!refreshToken) {
    throw ApiError.unauthorized("Refresh token is required");
  }

  await authService.logoutService(refreshToken);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return ApiResponse.ok(res, "Logout successfully");
});

// Controller lấy thông tin user hiện tại
export const getMeController = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.user?._id;

  if (!userId) {
    throw ApiError.unauthorized("Authentication required");
  }

  const user = await authService.getMeService(userId);

  return ApiResponse.ok(res, "Current user fetched successfully", user);
});
