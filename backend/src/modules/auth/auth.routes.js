import { Router } from "express";

import { registerSchema, loginSchema } from "./auth.validator.js";
import validate from "../../middleware/validate.middleware.js";

import * as authController from "./auth.controller.js";

const router = Router();

// ============================== REGISTER ==============================
router.post("/register", validate(registerSchema), authController.register);
// ============================== LOGIN ==============================
router.post("/login", validate(loginSchema), authController.login);
// ============================== REFRESH ==============================
router.post("/refresh", authController.refresh);
// ============================== LOGOUT ==============================
router.post("/logout", authController.logout);

export default router;
