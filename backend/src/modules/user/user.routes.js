import { Router } from "express";

import userController from "./user.controller.js";
import {
  getUserByIdValidator,
  updateProfileValidator,
  searchUsersValidator,
} from "./user.validator.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import validateMiddleware from "../../middleware/validate.middleware.js";

const router = Router();

// Hồ sơ của chính mình
router.get("/me", authMiddleware, userController.getProfile);
router.patch(
  "/me",
  authMiddleware,
  updateProfileValidator,
  validateMiddleware,
  userController.updateProfile,
);
router.patch("/avatar", authMiddleware, userController.updateAvatar);

router.patch("/password", authMiddleware, userController.changePassword);
// Tìm kiếm
router.get(
  "/search",
  authMiddleware,
  searchUsersValidator,
  validateMiddleware,
  userController.searchUsers,
);
router.get("/check-username", userController.checkUsernameAvailable);

router.get("/check-email", userController.checkEmailAvailable);
router.get("/", authMiddleware, userController.getUsers);

// Thông tin user khác
router.get(
  "/:id",
  authMiddleware,
  getUserByIdValidator,
  validateMiddleware,
  userController.getPublicProfile,
);
router.patch("/:id/status", authMiddleware, userController.updateStatus);

router.patch("/:id/active", authMiddleware, userController.updateActiveStatus);

router.patch("/:id/verify", authMiddleware, userController.verifyAccount);

router.delete("/:id", authMiddleware, userController.deleteUser);

export default router;
