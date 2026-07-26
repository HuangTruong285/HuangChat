import { Router } from "express";

import * as authController from "./auth.controller.js";
import * as authValidator from "./auth.validator.js";

import { protect } from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";

const router = Router();

router.post(
  "/register",
  authValidator.registerValidator,
  validate,
  authController.registerController,
);
router.post(
  "/login",
  authValidator.loginValidator,
  validate,
  authController.loginController,
);
router.get("/me", protect, authController.getMeController);

export default router;
