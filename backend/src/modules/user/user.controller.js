import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

import * as userService from "./user.service.js";

// ==============================
// CURRENT USER
// ==============================
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await userService.getCurrentUser(req.user.id);
  return ApiResponse.ok(res, "Current user fetched successfully", user);
});

const updateProfile = asyncHandler(async (req, res) => {
  const { displayName, bio } = req.body;
  const user = await userService.updateProfile(req.user.id, {
    displayName,
    bio,
  });
  return ApiResponse.ok(res, "Profile updated successfully", user);
});

const updateAvatar = asyncHandler(async (req, res) => {
  const user = await userService.updateAvatar(req.user.id, req.file);

  return ApiResponse.ok(res, "Avatar updated successfully", user);
});

const updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const user = await userService.updateStatus(req.user.id, status);

  return ApiResponse.ok(res, "Status successfully updated", user);
});

const changePassword = asyncHandler(async (req, res) => {
  await userService.changePassword({
    userId: req.user.id,
    currentPassword: req.body.currentPassword,
    newPassword: req.body.newPassword,
  });

  return ApiResponse.ok(res, "Password changed successfully");
});

const deleteCurrentUser = asyncHandler(async (req, res) => {
  await userService.deleteCurrentUser(req.user.id);

  return ApiResponse.ok(res, "Account successfully deleted");
});

// ==============================
// OTHER USER
// ==============================
const getPublicProfile = asyncHandler(async (req, res) => {
  const profile = await userService.getPublicProfile(
    req.params.userId,
    req.user.id,
  );

  return ApiResponse.ok(res, "Public profile fetched successfully", profile);
});

const searchUsers = asyncHandler(async (req, res) => {
  const { keyword } = req.query;

  const users = await userService.searchUsers(keyword);

  return ApiResponse.ok(res, "User search successful", users);
});

export {
  getCurrentUser,
  updateProfile,
  updateAvatar,
  updateStatus,
  changePassword,
  deleteCurrentUser,
  getPublicProfile,
  searchUsers,
};
