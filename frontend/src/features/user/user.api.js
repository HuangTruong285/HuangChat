import api from "../../lib/axios";

import { API } from "../../constants/api";

// ==============================
// GET CURRENT USER
// ==============================

export const getCurrentUser = async () => {
  const response = await api.get(API.USER.ME);

  return response.data.data;
};

// ==============================
// GET PUBLIC PROFILE
// ==============================

export const getPublicProfile = async (userId) => {
  const response = await api.get(API.USER.GET_PROFILE(userId));

  return response.data.data;
};

// ==============================
// UPDATE PROFILE
// ==============================

export const updateMe = async (data) => {
  const response = await api.patch(API.USER.UPDATE_PROFILE, data);

  return response.data.data;
};

// ==============================
// UPDATE AVATAR
// ==============================

export const updateAvatar = async (file) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const response = await api.patch(API.USER.UPDATE_AVATAR, formData);

  return response.data.data;
};

// ==============================
// UPDATE STATUS
// ==============================

export const updateStatus = async (status) => {
  const response = await api.patch(API.USER.UPDATE_STATUS, { status });
  return response.data.data;
};

export const changePassword = async (data) => {
  const response = await api.patch(API.USER.CHANGE_PASSWORD, data);
  return response.data.data;
};

// ==============================
// SEARCH USERS
// ==============================

export const searchUsers = async (params) => {
  const response = await api.get(API.USER.SEARCH, {
    params,
  });

  return response.data.data;
};

// ==============================
// DELETE CURRENT USER
// ==============================

export const deleteCurrentUser = async () => {
  const response = await api.delete(API.USER.DELETE_ME);
  return response.data.data;
};
