import { Router } from "express";

import * as userController from "./user.controller.js";
import {
  updateProfileSchema,
  updateAvatarSchema,
  updateStatusSchema,
  searchUsersSchema,
} from "./user.validator.js";

import validate from "../../middleware/validate.middleware.js";
import upload from "../../middleware/upload.middleware.js";

const router = Router();

// Hồ sơ của chính mình
router.get("/me", userController.getCurrentUser);

// Cập nhật thông tin cá nhân
router.patch(
  "/me",
  validate(updateProfileSchema),
  userController.updateProfile,
);

// Cập nhật avatar
router.patch(
  "/avatar",
  upload.single("avatar"),
  validate(updateAvatarSchema),
  userController.updateAvatar,
);

// Cập nhật trạng thái online / offline
router.patch(
  "/status",
  validate(updateStatusSchema),
  userController.updateStatus,
);

// Tìm kiếm người dùng
router.get(
  "/search",
  validate(searchUsersSchema, "query"),
  userController.searchUsers,
);

// Xóa tài khoản của chính mình
router.delete("/me", userController.deleteCurrentUser);

export default router;
