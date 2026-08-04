import { Router } from "express";

import userController from "./user.controller.js";
import {
  getUserByIdValidator,
  updateProfileValidator,
  searchUsersValidator,
} from "./user.validator.js";
import validateMiddleware from "../../middleware/validate.middleware.js";

const router = Router();

// Hồ sơ của chính mình
router.get("/me", userController.getProfile);
router.patch(
  "/me",
  updateProfileValidator,
  validateMiddleware,
  userController.updateProfile,
);
router.patch("/avatar", userController.updateAvatar);

router.patch("/password", userController.changePassword);
// Tìm kiếm
router.get(
  "/search",
  searchUsersValidator,
  validateMiddleware,
  userController.searchUsers,
);
router.get("/check-username", userController.checkUsernameAvailable);

router.get("/check-email", userController.checkEmailAvailable);
router.get("/", userController.getUsers);

// Thông tin user khác
router.get(
  "/:id",

  getUserByIdValidator,
  validateMiddleware,
  userController.getPublicProfile,
);
router.patch("/:id/status", userController.updateStatus);

router.patch("/:id/active", userController.updateActiveStatus);

router.patch("/:id/verify", userController.verifyAccount);

router.delete("/:id", userController.deleteUser);

export default router;
