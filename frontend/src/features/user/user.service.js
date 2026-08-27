import * as userApi from "./user.api";

// ==============================
// GET
// ==============================

export const getCurrentUser = () => {
  return userApi.getCurrentUser();
};

export const getPublicProfile = (userId) => {
  return userApi.getPublicProfile(userId);
};

// ==============================
// UPDATE
// ==============================

export const updateProfile = (data) => {
  return userApi.updateMe(data);
};

export const updateAvatar = (file) => {
  return userApi.updateAvatar(file);
};

export const updateStatus = (status) => {
  return userApi.updateStatus(status);
};

export const changePassword = (data) => {
  return userApi.changePassword(data);
};

// ==============================
// SEARCH
// ==============================

export const searchUsers = (params) => {
  return userApi.searchUsers(params);
};

// ==============================
// DELETE
// ==============================

export const deleteCurrentUser = () => {
  return userApi.deleteCurrentUser();
};
