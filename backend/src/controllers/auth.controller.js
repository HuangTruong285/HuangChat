import {
  register as registerService,
  login as loginService,
  getMe as getMeService,
} from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const user = await registerService(req.body);

  res.status(201).json(new ApiResponse(201, "Register successfully", user));
});

export const login = asyncHandler(async (req, res) => {
  const data = await loginService(req.body);

  return res.status(200).json(new ApiResponse(200, "Login successfully", data));
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await getMeService(req.user.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Current user fetched successfully", user));
});
