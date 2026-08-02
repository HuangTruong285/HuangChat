import { Router } from "express";

import userController from "./user.controller.js";
import {
  getUserByIdValidator,
  updateProfileValidator,
  searchUsersValidator,
} from "./user.validator.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = Router();

// Hồ sơ của chính mình
router.get("/me", authMiddleware, userController.getMe);
router.patch("/me", updateProfileValidator, userController.updateProfile);

// Tìm kiếm
router.get("/search", searchUsersValidator, userController.searchUsers);

// Thông tin user khác
router.get("/:id", getUserByIdValidator, userController.getUserById);

export default router;
