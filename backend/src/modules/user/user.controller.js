import userService from "./user.service.js";

import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getMe = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await userService.getMe(userId);

  return ApiResponse.ok(res, "Current user fetched successfully", user);
});

export default {
  getMe,
};
