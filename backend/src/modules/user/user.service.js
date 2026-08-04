import ApiError from "../../utils/ApiError.js";
import { hashPassword, comparePassword } from "../../utils/password.js";

import * as userRepository from "./user.repository.js";
import * as userMapper from "./user.mapper.js";

// ============================== PROFILE ==============================
// Lấy thông tin user hiện tại
export const getProfile = async (userId) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return user;
};
