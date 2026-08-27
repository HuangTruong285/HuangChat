import fs from "fs/promises";

import ApiError from "../../utils/ApiError.js";
import { uploadImage, deleteImage } from "../../service/cloudinary.service.js";

import * as userRepository from "./user.repository.js";
import * as userMapper from "./user.mapper.js";

import { friendService } from "../friend/index.js";

import { hashPassword, comparePassword } from "../../utils/password.js";

// ==============================
// GET PROFILE
// ==============================
const getCurrentUser = async (userId) => {
  // Kiểm tra xem người dùng có tồn tại
  const user = await userRepository.findById(userId);
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  return userMapper.toCurrentUser(user);
};

// ==============================
// GET PUBLIC PROFILE
// ==============================
const getPublicProfile = async (userId, currentUserId) => {
  const user = await userRepository.findPublicById(userId);
  if (!user) {
    throw ApiError.notFound("User not found");
  }

  const relationship = await friendService.getRelationshipStatus(
    currentUserId,
    userId,
  );

  return {
    ...userMapper.toPublicUser(user),
    relationship,
  };
};

// ==============================
// UPDATE PROFILE
// ==============================
const updateProfile = async (userId, data) => {
  const updateData = {};

  if (data.displayName !== undefined) {
    updateData.displayName = data.displayName;
  }

  if (data.bio !== undefined) {
    updateData.bio = data.bio;
  }

  // Cập nhật thông tin tên hiển thị và trả về thông tin người dùng
  const user = await userRepository.updateProfile(userId, updateData);
  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return userMapper.toCurrentUser(user);
};

// ==============================
// UPDATE AVATAR
// ==============================
const updateAvatar = async (userId, file) => {
  // Kiểm tra xem có file không
  if (!file) {
    throw ApiError.badRequest("Avatar is required");
  }

  // Kiểm tra user đó có tồn tại không
  const user = await userRepository.findById(userId);
  if (!user) {
    throw ApiError.notFound("User not found");
  }

  let result;
  try {
    // Upload lên Cloudinary
    result = await uploadImage(file.path, {
      folder: "chatapp/avatars",
    });

    const oldAvatarId = user.avatarId;

    // Update database
    const updatedUser = await userRepository.updateProfile(userId, {
      avatarUrl: result.secure_url,
      avatarId: result.public_id,
    });

    // Xóa avatar cũ trên Cloudinary
    if (oldAvatarId) {
      await deleteImage(oldAvatarId);
    }

    return userMapper.toCurrentUser(updatedUser);
  } finally {
    // Luôn xóa file tạm trên server
    try {
      await fs.unlink(file.path);
    } catch (error) {
      console.error("Failed to delete temporary file:", error);
    }
  }
};

// ==============================
// UPDATE STATUS
// ==============================
const updateStatus = async (userId, status) => {
  const user = await userRepository.updateStatus(userId, status);
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  return userMapper.toUserStatus(user);
};

const changePassword = async ({ userId, currentPassword, newPassword }) => {
  // Kiểm tra user có tồn tại không và láy cả mật khẩu
  const user = await userRepository.findByIdWithPassword(userId);
  if (!user) {
    throw ApiError.notFound("User not found");
  }

  // Kiểm tra mật khẩu có đúng không
  const isPasswordValid = await comparePassword(
    currentPassword,
    user.hashedPassword,
  );
  if (!isPasswordValid) {
    throw ApiError.badRequest("Current password is incorrect");
  }

  // Kiểm tra dữ liệu cũ và mới có giống nhau không
  if (currentPassword === newPassword) {
    throw ApiError.badRequest(
      "New password must be different from current password",
    );
  }

  const hashedPassword = await hashPassword(newPassword);

  await userRepository.updatePassword(userId, hashedPassword);

  return true;
};

// ==============================
// SEARCH
// ==============================
const searchUsers = async (keyword) => {
  const users = await userRepository.search(keyword);
  return userMapper.toPublicUsers(users);
};

// ==============================
// DELETE CURRENT USER
// ==============================

const deleteCurrentUser = async (userId) => {
  const user = await userRepository.deleteById(userId);
  if (!user) {
    throw ApiError.notFound("User not found");
  }
};

export {
  getCurrentUser,
  getPublicProfile,
  updateProfile,
  updateAvatar,
  updateStatus,
  changePassword,
  searchUsers,
  deleteCurrentUser,
};
