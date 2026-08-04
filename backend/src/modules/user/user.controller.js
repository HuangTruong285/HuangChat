import * as userService from "./user.service.js";
import * as userMapper from "./user.mapper.js";

import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

// ============================== USER ==============================
export const getProfile = asyncHandler(async (req, res) => {
  const user = await userService.getProfile(req.user.id);

  const responseData = userMapper.toCurrentUser(user);

  return ApiResponse.ok(res, "Current user fetched successfully", responseData);
});
