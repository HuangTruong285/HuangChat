import ApiError from "../../utils/ApiError.js";
import * as cloudinary from "../../utils/cloudinary.js";

import * as userRepository from "./user.repository.js";
import * as userMapper from "./user.mapper.js";

// ============================== GET PROFILE ==============================

export const getCurrentUser = async (userId) => {
  // Kiểm tra xem người dùng có tồn tại
  const user = await userRepository.findById(userId);
  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return userMapper.toCurrentUser(user);
};

// ============================== UPDATE PROFILE ==============================

export const updateProfile = async (userId, data) => {
  // Cập nhật thông tin tên hiển thị và trả về thông tin người dùng
  const user = await userRepository.updateProfile(userId, {
    displayName: data.displayName,
  });
  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return userMapper.toCurrentUser(user);
};

// ============================== UPDATE AVATAR ==============================

export const updateAvatar = async (userId, file) => {
  // Kiểm tra file có tồn tại không
  if (!file) {
    throw ApiError.badRequest("Avatar is required");
  }

  // Kiểm tra người dùng có tồn tại không
  const user = await userRepository.findById(userId);
  if (!user) {
    throw ApiError.notFound("User not found");
  }

  // upload hình ảnh lên cloudinary
  const result = await cloudinary.uploadImage(file.path, {
    folder: "chatapp/avatars",
  });

  const oldAvatarId = user.avatarId;

  const updatedUser = await userRepository.updateProfile(userId, {
    avatarUrl: result.secure_url,
    avatarId: result.public_id,
  });

  if (oldAvatarId) {
    await cloudinary.deleteImage(oldAvatarId);
  }

  return userMapper.toCurrentUser(updatedUser);
};

// ============================== UPDATE STATUS ==============================

export const updateStatus = async (userId, status) => {
  const user = await userRepository.updateStatus(userId, status);
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  return userMapper.toUserStatus(user);
};

// ============================== SEARCH ==============================

export const searchUsers = async (keyword) => {
  const users = await userRepository.search(keyword);
  return userMapper.toPublicUsers(users);
};

// ============================== DELETE CURRENT USER ==============================

export const deleteCurrentUser = async (userId) => {
  const user = await userRepository.deleteById(userId);
  if (!user) {
    throw ApiError.notFound("User not found");
  }
};
