import { Router } from "express";

import userController from "./user.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/me", authMiddleware, userController.getMe);

export default router;
