import { Router } from "express";

import { registerValidator, loginValidator } from "./auth.validator.js";
import validateMiddleware from "../../middleware/validate.middleware.js";

import * as authController from "./auth.controller.js";

const router = Router();

// ============================== REGISTER ==============================
router.post(
  "/register",
  registerValidator,
  validateMiddleware,
  authController.register,
);
// ============================== LOGIN ==============================
router.post("/login", loginValidator, validateMiddleware, authController.login);
// ============================== REFRESH ==============================
router.post("/refresh", authController.refresh);
// ============================== LOGOUT ==============================
router.post("/logout", authController.logout);

export default router;
