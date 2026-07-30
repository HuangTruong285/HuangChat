import { Router } from "express";

import * as authController from "./auth.controller.js";
import * as authValidator from "./auth.validator.js";

import { protect } from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";

const router = Router();

// Route đăng ký tài khoản mới
router.post(
  "/register",
  authValidator.registerValidator,
  validate,
  authController.registerController,
);

// Route đăng nhập
router.post(
  "/login",
  authValidator.loginValidator,
  validate,
  authController.loginController,
);

// Route làm mới access token bằng refresh token
router.post("/refresh", authController.refreshTokenController);

// Route đăng xuất
router.post("/logout", protect, authController.logoutController);

// Route lấy thông tin user hiện tại
router.get("/me", protect, authController.getMeController);

export default router;
