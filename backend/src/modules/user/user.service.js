import ApiError from "../../utils/ApiError.js";

import userRepository from "./user.repository.js";
import userMapper from "./user.mapper.js";

// Lấy thông tin người dùng hiện tại
export const getCurrentUser = async (userId) => {
  // Lấy thông tin user từ DB
  const user = await userRepository.findById(userId);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return userMapper.toCurrentUser(user);
};

// Lấy thông tin public của một user
export const getUserById = async (userId) => {
  const user = await userRepository.findPublicById(userId);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return userMapper.toPublicUser(user);
};

// Cập nhật hồ sơ cá nhân
export const updateProfile = async (userId, updateData) => {
  const allowedFields = ["displayName", "bio"];

  const update = {};

  for (const field of allowedFields) {
    if (updateData[field] !== undefined) {
      update[field] = updateData[field];
    }
  }

  const user = await userRepository.updateById(userId, update);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return userMapper.toCurrentUser(user);
};

// Tìm kiếm người dùng
export const searchUsers = async (keyword) => {
  const users = await userRepository.search(keyword);

  return userMapper.toSearchResults(users);
};

export default {
  getCurrentUser,
  getUserById,
  updateProfile,
  searchUsers,
};
