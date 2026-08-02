import userService from "./user.service.js";

import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

// GET /users/me
export const getMe = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await userService.getCurrentUser(userId);

  return ApiResponse.ok(res, "Current user fetched successfully", user);
});

// GET /users/:id
const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  return ApiResponse.OK(res, "Lấy thông tin user thành công", user);
});

// PATCH /users/me
const updateProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateProfile(req.user.id, req.body);

  return ApiResponse.ok(res, "Cập nhật thông tin thành công", user);
});

// Get /users/search?q=...
const searchUsers = asyncHandler(async (red, res) => {
  const users = await userService.searchUsers(req.query.q);

  return ApiResponse.ok(res, "Tìm kiếm danh sách người dùng thành công", users);
});

export default {
  getMe,
  getUserById,
  updateProfile,
  searchUsers,
};
