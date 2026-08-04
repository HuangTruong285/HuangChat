import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import {
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
} from "../../utils/cookie.js";

import * as authService from "./auth.service.js";
import * as authMapper from "./auth.mapper.js";

// ============================== REGISTER ==============================
export const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);

  setRefreshTokenCookie(res, result.refreshToken);

  const responseData = authMapper.toAuthResponse(
    result.user,
    result.accessToken,
  );

  return ApiResponse.created(res, "User registered successfully", responseData);
});

// ============================== Login ==============================
export const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  setRefreshTokenCookie(res, result.refreshToken);

  const responseData = authMapper.toAuthResponse(
    result.user,
    result.accessToken,
  );

  return ApiResponse.ok(res, "User logged in successfully", responseData);
});

// ============================== REFRESH ==============================
export const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw ApiError.unauthorized("Refresh token is required");
  }

  const result = await authService.refresh(refreshToken);

  setRefreshTokenCookie(res, result.refreshToken);

  const responseData = authMapper.toRefreshResponse(result.accessToken);

  return ApiResponse.ok(
    res,
    "Access token refreshed successfully",
    responseData,
  );
});

// ============================== LOGOUT ==============================
export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    await authService.logout(refreshToken);
  }

  clearRefreshTokenCookie(res);

  return ApiResponse.ok(res, "Logout successfully");
});
