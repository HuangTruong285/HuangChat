import {
  register as registerService,
  login as loginService,
  getMe as getMeService,
} from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const user = await registerService(req.body);

  return ApiResponse.created(res, "Register successfully", user);
});

export const login = asyncHandler(async (req, res) => {
  const data = await loginService(req.body);

  return ApiResponse.ok(res, "Login successfully", data);
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await getMeService(req.user.id);

  return ApiResponse.ok(res, "Current user fetched successfully", user);
});
