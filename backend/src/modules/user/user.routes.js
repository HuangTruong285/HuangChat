import { Router } from "express";

import * as userController from "./user.controller.js";
import {
  getUserByIdValidator,
  updateProfileValidator,
  searchUsersValidator,
} from "./user.validator.js";
import validateMiddleware from "../../middleware/validate.middleware.js";

const router = Router();

// Hồ sơ của chính mình
router.get("/me", userController.getProfile);

export default router;
