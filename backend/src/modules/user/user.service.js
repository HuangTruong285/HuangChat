import ApiError from "../../utils/ApiError.js";
import { hashPassword, comparePassword } from "../../utils/password.js";

import userRepository from "./user.repository.js";
import userMapper from "./user.mapper.js";

// ============================== PROFILE ==============================
// Lấy thông tin user hiện tại
export const getProfile = async (userId) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return userMapper.toCurrentUser(user);
};

// Lấy thông tin public của một user
export const getPublicProfile = async (userId) => {
  const user = await userRepository.findPublicById(userId);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return userMapper.toPublicUser(user);
};
// ============================== UPDATE PROFILE ==============================
// Cập nhật hồ sơ cá nhân
export const updateProfile = async (userId, updateData) => {
  const allowedFields = ["displayName", "bio"];

  const update = {};

  for (const field of allowedFields) {
    if (updateData[field] !== undefined) {
      update[field] = updateData[field];
    }
  }

  const user = await userRepository.updateProfile(userId, update);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return userMapper.toCurrentUser(user);
};
// ============================== UPDATE AVATAR ==============================
export const updateAvatar = async (userId, avatarUrl) => {
  const updatedUser = await userRepository.updateById(userId, {
    avatar: avatarUrl,
  });

  if (!updatedUser) {
    throw ApiError.notFound("User not found");
  }

  return userMapper.toCurrentUser(updatedUser);
};
// ============================== UPDATE PASSWORD ==============================
export const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await userRepository.findByIdWithPassword(userId);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  const matched = await comparePassword(currentPassword, user.password);

  if (!matched) {
    throw ApiError.badRequest("Current password is incorrect");
  }

  const hashedPassword = await hashPassword(newPassword);

  await userRepository.updatePassword(userId, hashedPassword);

  return;
};
// ============================== SEARCH ==============================
// Tìm kiếm người dùng
export const searchUsers = async (keyword, currentUserId, limit = 20) => {
  const users = await userRepository.search(keyword, limit);

  const filteredUsers = users.filter(
    (user) => user._id.toString() !== currentUserId.toString(),
  );

  return userMapper.toSearchResults(filteredUsers);
};
// ============================== USERS ==============================
export const getUsers = async (page = 1, limit = 10) => {
  const [users, total] = await Promise.all([
    userRepository.findAll(page, limit),
    userRepository.count(),
  ]);

  return {
    users: users.map(userMapper.toCurrentUser),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
// ============================== STATUS ==============================
export const updateStatus = async (userId, status) => {
  let lastSeen = null;

  if (status === "offline") {
    lastSeen = new Date();
  }

  const updatedUser = await userRepository.updateStatusById(userId, {
    status,
    lastSeen,
  });

  if (!updatedUser) {
    throw ApiError.notFound("User not found");
  }

  return userMapper.toCurrentUser(updatedUser);
};
// ============================== ACTIVE ==============================
export const updateActiveStatus = async (userId, isActive) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  const updatedUser = await userRepository.updateActiveStatus(userId, isActive);

  return userMapper.toCurrentUser(updatedUser);
};
// ============================== VERIFY ==============================
export const verifyAccount = async (userId) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  const updatedUser = await userRepository.markVerified(userId);

  return userMapper.toCurrentUser(updatedUser);
};
// ============================== DELETE ==============================
export const deleteUser = async (userId) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  await userRepository.deleteById(userId);

  return;
};
// ============================== CHECK ==============================
export const checkUsernameAvailable = async (username) => {
  const exists = await userRepository.existsByUsername(username);

  return {
    available: !exists,
  };
};

export const checkEmailAvailable = async (email) => {
  const exists = await userRepository.existsByEmail(email);

  return {
    available: !exists,
  };
};

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
