import ApiError from "../../utils/ApiError.js";

import * as userRepository from "./user.repository.js";
import * as userMapper from "./user.mapper.js";

// ============================== GET PROFILE ==============================

export const getCurrentUser = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  return userMapper.toCurrentUser(user);
};

// ============================== UPDATE PROFILE ==============================

export const updateProfile = async (userId, data) => {
  const user = await userRepository.updateProfile(userId, {
    displayName: data.displayName,
  });
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  return userMapper.toCurrentUser(user);
};

// ============================== UPDATE AVATAR ==============================

export const updateAvatar = async (userId, avatar) => {
  const user = await userRepository.updateProfile(userId, {
    avatar,
  });
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  return userMapper.toCurrentUser(user);
};

// ============================== UPDATE STATUS ==============================

export const updateStatus = async (userId, status) => {
  const user = await userRepository.updateStatus(userId, status);
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  return userMapper.toCurrentUser(user);
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
