import { Router } from "express";

import authController from "./auth.controller.js";
import { registerValidator, loginValidator } from "./auth.validator.js";
import validate from "../../middleware/validate.middleware.js";

const router = Router();

// Route đăng ký tài khoản mới
router.post("/register", registerValidator, validate, authController.register);

// Route đăng nhập
router.post("/login", loginValidator, validate, authController.login);

// Route làm mới access token bằng refresh token
router.post("/refresh", authController.refresh);

// Route đăng xuất
router.post("/logout", authController.logout);

export default router;
