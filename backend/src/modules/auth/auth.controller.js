import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

import * as authService from "./auth.service.js";

export const registerController = asyncHandler(async (req, res) => {
  const user = await authService.registerService(req.body);

  return ApiResponse.created(res, "Register successfully", user);
});

export const loginController = asyncHandler(async (req, res) => {
  const data = await authService.loginService(req.body);

  return ApiResponse.ok(res, "Login successfully", data);
});

export const getMeController = asyncHandler(async (req, res) => {
  const user = await authService.getMeService(req.user.id);

  return ApiResponse.ok(res, "Current user fetched successfully", user);
});
