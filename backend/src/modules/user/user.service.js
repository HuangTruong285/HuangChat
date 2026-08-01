import ApiError from "../../utils/ApiError.js";

import userRepository from "./user.repository.js";
import { toUserResponse } from "./user.mapper.js";

export const getMe = async (userId) => {
  // Lấy thông tin user từ DB
  const user = await userRepository.findById(userId);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return toUserResponse(user);
};

export default {
  getMe,
};
