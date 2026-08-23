import api from "../../lib/axios";
import { API } from "../../constants/api";

export const getCurrentUser = async () => {
  const response = await api.get(API.USER.ME);
  return response.data;
};

export const updateMe = async (data) => {
  const response = await api.patch(API.USER.UPDATE_PROFILE, data);
  return response.data;
};

export const updateAvatar = async (file) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const response = await api.patch(API.USER.UPDATE_AVATAR, formData);

  return response.data;
};

export const updateStatus = async (status) => {
  const response = await userApi.patch(API.USER.UPDATE_STATUS, { status });

  return response.data;
};

export const searchUsers = async (params) => {
  const response = await api.get(API.USER.SEARCH, {
    params,
  });

  return response.data;
};

export const deleteCurrentUser = async () => {
  const response = await api.delete(API.USER.DELETE_ME);

  return response.data;
};
