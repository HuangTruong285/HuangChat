import { Router } from "express";

import * as userController from "./user.controller.js";

const router = Router();

// Hồ sơ của chính mình
router.get("/me", userController.getCurrentUser);

export default router;
