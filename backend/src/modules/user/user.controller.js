import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

import * as userService from "./user.service.js";

// ============================== GET USER ==============================
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await userService.getCurrentUser(req.user.id);

  return ApiResponse.ok(res, "Current user fetched successfully", user);
});

// ============================== UPDATE PROFILE ==============================
export const updateProfile = asyncHandler(async (req, res) => {
  const { displayName } = req.body;
  const user = await userService.updateProfile(req.user.id, { displayName });

  return ApiResponse.ok(res, "Profile updated successfully", user);
});

// ============================== UPDATE AVATAR ==============================
export const updateAvatar = asyncHandler(async (req, res) => {
  const user = await userService.updateAvatar(req.user.id, req.file);

  return ApiResponse.ok(res, "Avatar updated successfully", user);
});

// ============================== UPDATE STATUS ==============================
export const updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const user = await userService.updateStatus(req.user.id, status);

  return ApiResponse.ok(res, "Status successfully updated", user);
});

// ============================== SEARCH ==============================
export const searchUsers = asyncHandler(async (req, res) => {
  const { keyword = "" } = req.query;

  const users = await userService.searchUsers(keyword);

  return ApiResponse.ok(res, "User search successful", users);
});

// ============================== DELETE CURRENT USER ==============================
export const deleteCurrentUser = asyncHandler(async (req, res) => {
  await userService.deleteCurrentUser(req.user.id);

  return ApiResponse.ok(res, "Account successfully deleted");
});
