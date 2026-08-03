import userService from "./user.service.js";

import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

// ============================== USERS ==============================
export const getProfile = asyncHandler(async (req, res) => {
  const user = await userService.getProfile(req.user.id);

  return ApiResponse.ok(res, "Current user fetched successfully", user);
});

export const getPublicProfile = asyncHandler(async (req, res) => {
  const user = await userService.getPublicProfile(req.params.id);

  return ApiResponse.OK(res, "Lấy thông tin user thành công", user);
});
// ============================== UPDATE ==============================
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateProfile(req.user.id, req.body);

  return ApiResponse.ok(res, "Profile updated successfully", user);
});

export const updateAvatar = asyncHandler(async (req, res) => {
  const user = await userService.updateAvatar(req.user.id, req.body.avatar);

  return ApiResponse.ok(res, "Avatar updated successfully", user);
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  await userService.changePassword(req.user.id, currentPassword, newPassword);

  return ApiResponse.success(res, "Password changed successfully");
});

// ============================== SEARCH ==============================
export const searchUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.q || "";
  const limit = Number(req.query.limit) || 20;

  const users = await userService.searchUsers(keyword, req.user.id, limit);

  return ApiResponse.ok(res, "Tìm kiếm thành công", users);
});
// ============================== USERS ==============================
export const getUsers = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await userService.getUsers(page, limit);

  return ApiResponse.success(res, result);
});

// ============================== STATUS ==============================

export const updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const user = await userService.updateStatus(req.params.id, status);

  return ApiResponse.success(res, user, "Status updated successfully");
});

export const updateActiveStatus = asyncHandler(async (req, res) => {
  const { isActive } = req.body;

  const user = await userService.updateActiveStatus(req.params.id, isActive);

  return ApiResponse.success(res, user, "Account status updated successfully");
});

// ============================== VERIFY ==============================

export const verifyAccount = asyncHandler(async (req, res) => {
  const user = await userService.verifyAccount(req.params.id);

  return ApiResponse.success(res, user, "Account verified successfully");
});

// ============================== DELETE ==============================

export const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);

  return ApiResponse.success(res, null, "User deleted successfully");
});

// ============================== CHECK ==============================

export const checkUsernameAvailable = asyncHandler(async (req, res) => {
  const result = await userService.checkUsernameAvailable(req.query.username);

  return ApiResponse.success(res, result);
});

export const checkEmailAvailable = asyncHandler(async (req, res) => {
  const result = await userService.checkEmailAvailable(req.query.email);

  return ApiResponse.success(res, result);
});

export default {
  getProfile,
  getPublicProfile,

  updateProfile,
  updateAvatar,
  changePassword,

  searchUsers,
  getUsers,

  updateStatus,
  updateActiveStatus,
  verifyAccount,

  deleteUser,

  checkUsernameAvailable,
  checkEmailAvailable,
};
