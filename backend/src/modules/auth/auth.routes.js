import { Router } from "express";

import authController from "./auth.controller.js";
import { registerValidator, loginValidator } from "./auth.validator.js";
import validateMiddleware from "../../middleware/validate.middleware.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = Router();

// Route đăng ký
router.post(
  "/register",
  registerValidator,
  validateMiddleware,
  authController.register,
);

// Route đăng nhập
router.post("/login", loginValidator, validateMiddleware, authController.login);

// Route làm mới access token bằng refresh token
router.post("/refresh", authController.refresh);

// Route đăng xuất
router.post("/logout", authController.logout);
router.get("/me", authMiddleware, authController.getMe);

export default router;
